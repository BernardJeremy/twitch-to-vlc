#!/usr/bin/env node

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
  { name: 'options', multiple: true, defaultOption: true, type: String},
  { name: 'token', alias: 't', type: String },
  { name: 'channel', alias: 'c', type: String },
  { name: 'video', alias: 'v', type: String },
];

//command line options parser
const options = commandLineArgs(optionDefinitions);

LOG(options);

//command line options validator
if (!optionsChecker(options)){
  LOG("Parameter error. Usage :");
  LOG("URL [chunked, 720p30, 480p30, 360p30, 160p30, audio_only] [--token/-t TOKEN]");
  LOG("OR");
  LOG("-c channelName [chunked, 720p30, 480p30, 360p30, 160p30, audio_only] [--token/-t TOKEN]");
  LOG("OR");
  LOG("-v videoId [chunked, 720p30, 480p30, 360p30, 160p30, audio_only] [--token/-t TOKEN]");
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

//url management
let url = (options.options && options.options.length > 0 ? options.options[0] : '');
if (options.channel && options.channel !== '') {
  url = 'https://www.twitch.tv/' + options.channel;
} else if (options.video && options.video !== '') {
  url = 'https://www.twitch.tv/videos/' + options.video;
}

//quality management
let quality = '';
if (options.options && (options.channel || options.video)) {
  quality = options.options[0]
} else if (options.options){
  quality = (options.options.length > 1 ? options.options[1] : '');
}

//retrieve links. Start VLC with given quality or display available quality
getTwitchLink(url, token).then(function(ret){
  if (quality !== '') {
    if (typeof ret[quality] !== 'undefined') {
      let child = spawn(
        pathVlc,
        [ret[quality].url],
        { detached: true, stdio: [ 'ignore', 'ignore', 'ignore' ] }
      );
      child.unref();
      LOG("VLC", "Player started");
      LOG("LINK", ret[quality].url);
      LOG("QUALITY", quality);
      LOG("INFO", "VLC will start shortly");
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
