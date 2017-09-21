// Only use New Relic on production
process.env.NODE_ENV === 'prod' ? require('newrelic') : null;

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.js';
import authS3O from 's3o-middleware';
import request from 'superagent';
import session from 'express-session';
import _ from 'lodash';
import expressWebService from '@financial-times/express-web-service';

const app = express();
const compiler = webpack(config);
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();

app.use(webpackMiddleware(compiler));

function apiBackendRequest(req, res, apiRoute, method) {
  const apiPath = process.env.API_PATH;
  const apiUrl = `${apiPath}/${apiRoute}`;

  const apiPathAuth = process.env.API_PATH_AUTH;

  const isProduction = process.env.NODE_ENV === 'prod';
  const requestMethodAndApiUrl = method === 'POST' ? request(method, apiUrl).send(req.body) : request('GET', apiUrl);

  if (isProduction) {
    requestMethodAndApiUrl
      .set(`Authorization`, apiPathAuth)
      .end(function (err, resp) {
        if (err || !resp.ok) {
          console.log(resp.toError());
        } else {
          res.send(resp.body);
        }
      })
  } else {
    requestMethodAndApiUrl
      .set(`Authorization`, apiPathAuth)
      .end(function (err, resp) {
        if (err || !resp.ok) {
          console.log(resp.toError());
        } else {
          res.send(resp.body);
        }
      })
  }
}

let sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}

app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionOptions));

function bypassS3oAuth(req) {
  return process.env.NODE_ENV === 'test';
}

app.set('port', (process.env.PORT || 5000));
app.use('/',router);

// Register endpoints like /__gtg, /__health and /__about BEFORE s3o
// So they can be accessed by automated systems
router.use(expressWebService({
    manifestPath: path.join(__dirname, 'package.json')
}));
router.use(function (req, res, next) {
  let sess = req.session;
  if (sess.isAuthenticated || bypassS3oAuth(req)) {
    sess.isAuthenticated = true;
    return next();
  } else {
    app.set('s3o-cookie-ttl', 86400000);
      // Rewrite request header 'host' to force S3O to redirect to required tagme url
      req.headers.host = (process.env.SERVER_HOSTNAME)? process.env.SERVER_HOSTNAME : req.headers.host;
      authS3O(req, res, next)
  }
});

router.use(express.static(__dirname + '/_build'));

router.post('/api/post', bodyParserJson, function response(req, res){
  apiBackendRequest(req, res, `photos-by-text`, 'POST');
});
router.get('/api/get/:uuid', function response(req, res){
  apiBackendRequest(req, res, `photos-by-uuid/${req.params.uuid}`);
});

router.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '_build/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
