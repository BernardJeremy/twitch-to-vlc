const spawn = require('child_process').spawn;

const commandLineArgs = require('command-line-args');

const LOG = require('./lib/logger').log;
const DEBUG = require('./lib/logger').debug;

const optionsChecker = require('./src/checkOptions');
const getTwitchLink = require('./src/getTwitchLink');

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

let token = (options.hasToken ? options.token : '');
LOG("TOKEN", token == '' ? null : token);

let quality = (options.hasQuality? options.quality : '');
LOG("QUALITY", quality == '' ? null : quality );

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

getTwitchLink(type, target, token).then(function(ret){
  //LOG("Link", ret);
  if (options.hasQuality) {
    if (typeof ret[options.quality] !== 'undefined') {
      LOG("QUALITY", options.quality)
      LOG("LINK", ret[options.quality].url)
      spawn(pathVlc, [ret[options.quality].url]);
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
