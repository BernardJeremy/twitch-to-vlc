# twitch-to-vlc
Node.js program created to play twitch stream and VOD in VLC

## Features
- Start VLC with a twitch stream/VOD
- Display every quality available
- Set the quality directly from the command line

## Requirement
- `Node.JS` v6.x.x+
- `NPM`

## Installation
- Simply clone this depot
- Copy [config.json.example](https://github.com/BernardJeremy/twitch-to-vlc/blob/master/config.json.example) file into a `config.json` file.
- Update if necessary the path of VLC in the `config.json` file.
- Add your own `client_id` if you want to in the `config.json` file.
- Perform `npm install` command.

## Run
- Full URL (channel or video) :  `node index.js  URL [quality] [-t oauthToken]`
- Channel :  `node index.js -c channelName [quality] [-t oauthToken]`
- Video :  `node index.js -v videoID [quality] [-t oauthToken]`
- Token for `-t` option is a user OAuth token (see [here](https://github.com/justintv/Twitch-API/blob/master/authentication.md#getting-access-tokens) for details)
- Enjoy !

## Configuration
- `pathVlc` : Absolute path toward you VLC binary.
- `client_id` : Your app client_id. See  [here](https://github.com/justintv/Twitch-API/blob/master/authentication.md#developer-setup) for details