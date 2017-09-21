import request from 'superagent';

export default function (api, jsonToSend) {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/${api}`)
      .send(jsonToSend)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          reject(res.toError());
        } else {
          resolve(res.body);
        }
      });
  });
}
