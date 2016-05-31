# twitch-to-vlc
Node.js program used to play twitch stream in VLC

## Features
- Start VLC with a twitch stream
- Choice on every quality available

## Installation
- Simply clone this depot
- Copy [config.json.exemple](https://github.com/BernardJeremy/twitch-to-vlc/blob/master/config.json.exemple) file into a `config.json` file.
- Update if necessary the path of VLC in the `config.json` file.
- Perform `npm install` command.

## Run
- Run `npm start <channelName>` or `npm index.js <channelName>`
- Choose the quality by entering its number.
- Enjoy !

## Configuration
- `pathVlc` : Absolute path toward you VLC binary.
