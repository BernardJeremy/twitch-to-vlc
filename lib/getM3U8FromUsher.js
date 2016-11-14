const rp = require('request-promise');

const rand = require('./random');

const typeNameUrl = {
  video : 'vod',
  channel : 'api/channel/hls',
}

function getM3U8FromUsher(type, videoID, token, sig) {
  videoID += (type === 'channel' ? '.m3u8' : '');
  let queryParam = {
    uri: 'http://usher.twitch.tv/' + typeNameUrl[type] + '/' + videoID,
    qs: {
        nauth: token,
        allow_audio_only: true,
        p: rand(0, 9999),
        allow_source: false,
        allow_spectre: false,
        nauthsig: sig,
        player: 'twitchweb',
        type: 'any'

    },
    headers: {
        'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
    },
  };
  return rp(queryParam);
}

module.exports = getM3U8FromUsher;
