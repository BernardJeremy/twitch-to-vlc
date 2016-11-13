const spawn = require('child_process').spawn;
const Readable = require('stream').Readable

const rp = require('request-promise');
const commandLineArgs = require('command-line-args');
const M3U8Parser = require('m3u8').createStream();

const LOG = require('./lib/logger').log;
const DEBUG = require('./lib/logger').debug;
const rand = require('./lib/random');

const optionsChecker = require('./src/checkOptions');

const pathVlc = require('./config.json').pathVlc;

const optionDefinitions = [
  { name: 'channel', alias: 'c', type: String },
  { name: 'video', alias: 'v', type: String },
  { name: 'quality', alias: 'q', type: String },
  { name: 'token', alias: 't', type: String }
];

const options = commandLineArgs(optionDefinitions);

if (!optionsChecker(options)){
  LOG("Parameter error. Usage :");
  LOG("--token/-t [token] --channel/-c [channel] --quality/-q [audio/mobile/low/medium/high/source]");
  LOG("--token/-t [token] --video/-v [video] --quality/-q [audio/mobile/low/medium/high/source]");
  process.exit(1);
}
DEBUG(options);

let queryParam = {
    uri: 'https://api.twitch.tv/api/vods/' + '100217285' + '/access_token.json',
    qs: {
        oauth_token: ''
    },
    headers: {
        'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(queryParam)
    .then(function (ret) {
      console.log('access_token.token : ', ret.token);
        console.log('access_token.sig : ', ret.sig);
        let usherQueryParam = {
          uri: 'http://usher.twitch.tv/vod/' + '100217285',
          qs: {
              nauth: ret.token,
              allow_audio_only: true,
              p: rand(0, 9999),
              allow_source: true,
              allow_spectre: false,
              nauthsig: ret.sig,
              player: 'twitchweb',
              type: 'any'

          },
          headers: {
              'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
          },
//          json: true // Automatically parses the JSON string in the response
        };

        rp(usherQueryParam)
            .then(function (ret) {
              var s = new Readable;
              s.push(ret);
              s.push(null);

              s.pipe(M3U8Parser);
              M3U8Parser.on('m3u', function(m3u) {
                // fully parsed m3u file
                console.log('usher/ : ', m3u.items.StreamItem[0].properties.uri);
                spawn(pathVlc, [m3u.items.StreamItem[0].properties.uri]);
              });

            })
            .catch(function (err) {
                console.log(err);
            });
    })
    .catch(function (err) {
        console.log(err);
    });
