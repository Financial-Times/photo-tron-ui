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

app.use(webpackMiddleware(compiler));

function apiBackendRequest(req, res, apiRoute) {
  const apiPath = process.env.API_PATH;
  const apiUrl = `${apiPath}/${apiRoute}`;
  const apiKey = process.env.API_KEY;
  const xApiKey = process.env.X_API_KEY;
  const isProduction = process.env.NODE_ENV === 'prod' ? true : false;

  if (isProduction) {
    request.get(apiUrl)
      .set(`api-key`, apiKey)
      .end(function (err, resp) {
        if (err || !resp.ok) {
          console.log(resp.toError());
        } else {
          res.send(resp.body);
        }
      })
  } else {
    request.get(apiUrl)
      .set(`x-api-key`, xApiKey)
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
//app.use(session(sessionOptions));

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
// router.use(function (req, res, next) {
//   let sess = req.session;
//   if (sess.isAuthenticated || bypassS3oAuth(req)) {
//     sess.isAuthenticated = true;
//     return next();
//   } else {
//     app.set('s3o-cookie-ttl', 86400000);
//       // Rewrite request header 'host' to force S3O to redirect to required tagme url
//       req.headers.host = (process.env.SERVER_HOSTNAME)? process.env.SERVER_HOSTNAME : req.headers.host;
//       authS3O(req, res, next)
//   }
// })

router.use(express.static(__dirname + '/_build'));

// router.get('/api/genre*', function response(req, res){
//   apiBackendRequest(req, res, 'genre');
// });

router.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '_build/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
