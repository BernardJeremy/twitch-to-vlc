const getAccessToken = require('../lib/getAccessToken');
const getM3U8FromUsher = require('../lib/getM3U8FromUsher');
const M3U8Parser = require('../lib/parseM3U8');

const LOG = require('../lib/logger').log;
const DEBUG = require('../lib/logger').debug;

function getVideoLink(type, videoID, oauthToken) {
  return new Promise(function(resolve, reject) {
    getAccessToken(type, videoID, oauthToken).then(function (ret) {
      DEBUG('access_token.token : ' + ret.token);
      DEBUG('access_token.sig : ' + ret.sig);

      getM3U8FromUsher(type, videoID, ret.token, ret.sig).then(function (usher) {
        M3U8Parser(usher).then(function(linkArray){
          resolve(linkArray)
        }).catch(function(err){
          reject(err);
        });

      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

module.exports = getVideoLink;
