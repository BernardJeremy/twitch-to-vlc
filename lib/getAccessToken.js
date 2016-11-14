const rp = require('request-promise');

const typeNameUrl = {
  video : "vods",
  channel : "channels",
}

function getAccessToken(type, videoID, oauthToken) {
  let queryParam = {
    uri: 'https://api.twitch.tv/api/' + typeNameUrl[type] + '/' + videoID + '/access_token.json',
    qs: {
      oauth_token: oauthToken
    },
    headers: {
      'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
    },
    json: true
  };
  return rp(queryParam);
};

module.exports = getAccessToken;
