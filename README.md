# twitch-to-vlc
Node.js program used to play twitch stream in VLC

## Features
- Start VLC with a twitch stream
- Choice on every quality available
- Set the quality directly from the command line

## Installation
- Simply clone this depot
- Copy [config.json.example](https://github.com/BernardJeremy/twitch-to-vlc/blob/master/config.json.example) file into a `config.json` file.
- Update if necessary the path of VLC in the `config.json` file.
- Perform `npm install` command.

## Run
- Run `npm start <channelName> [qualityNumber]` or `npm index.js <channelName> [qualityNumber]`
- Choose the quality by entering its number (if you've not did it in the command line).
- Enjoy !

## Configuration
- `pathVlc` : Absolute path toward you VLC binary.
