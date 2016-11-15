//system require
const spawn = require('child_process').spawn;

//dependency require (node_modules)
const commandLineArgs = require('command-line-args');
const getTwitchLink = require('node-twitch-link');

//logger requires
const LOG = require('./lib/logger').log;
const DEBUG = require('./lib/logger').debug;

//optionsChecker require
const optionsChecker = require('./src/checkOptions');

//config loader
const pathVlc = require('./config.json').pathVlc;
const client_id = require('./config.json').client_id;

//command line options register
const optionDefinitions = [
  { name: 'channel', alias: 'c', type: String },
  { name: 'video', alias: 'v', type: String },
  { name: 'quality', alias: 'q', type: String },
  { name: 'token', alias: 't', type: String }
];

//command line options parser
const options = commandLineArgs(optionDefinitions);

//command line options validator
if (!optionsChecker(options)){
  LOG("Parameter error. Usage :");
  LOG("--token/-t [token] --channel/-c [channel] --quality/-q [audio/mobile/low/medium/high/source]");
  LOG("--token/-t [token] --video/-v [video] --quality/-q [audio/mobile/low/medium/high/source]");
  process.exit(1);
}

//token management, use client_id from config as fallback
let token = (options.hasToken ? {oauth_token: options.token} : '');
LOG("TOKEN", token == '' ? null : token);
if (token == '') {
  if (typeof client_id === "undefined" || client_id == ''){
    LOG("TOKEN", "No token (client_id or oauth_token) availble. Exit.");
    process.exit(1);
  } else {
    token = {client_id};
  }
}

//quality management
let quality = (options.hasQuality? options.quality : '');
LOG("QUALITY", quality == '' ? null : quality );

//sorting between video (vod) and channel (stream)
let type = '';
let target = '';
if (options.isVideo) {
  target = options.video;
  type = 'video'
  LOG("VIDEO", target);
} else if (options.isChannel) {
  target = options.channel;
  type = 'channel'
  LOG("CHANNEL", target);
}

//retrieve links. Start VLC with given quality or display available quality
getTwitchLink(type, target, token).then(function(ret){
  //LOG("Link", ret);
  if (options.hasQuality) {
    if (typeof ret[options.quality] !== 'undefined') {
      let child = spawn(
        pathVlc,
        [ret[options.quality].url],
        { detached: true, stdio: [ 'ignore', 'ignore', 'ignore' ] }
      );
      child.unref();
      LOG("VLC", "Player started");
      LOG("LINK", ret[options.quality].url);
      LOG("QUALITY", options.quality);
      return;
    } else {
      LOG("ERROR", "Your quality is not available")
    }
  }

  let qualityAvailableStr = 'Available quality : ';
  for (r in ret) {
    qualityAvailableStr += r + ', ';
  }
  console.log(qualityAvailableStr);

}).catch(function(err){
  LOG("Error", err.message);
});
