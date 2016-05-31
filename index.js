const spawn = require('child_process').spawn;
const readline = require('readline');
const getLinks = require('twitch-url/twitch')

let pathVlc = require('./config.json').pathVlc;

/*
  Check if the program is run with at least 3 arguments
 */
if (process.argv.length < 3) {
  console.log('Missing live name parameter');
  process.exit();
}

/*
  Retrieve live name paramters
 */
let channelName = process.argv[2];


getLinks(channelName, (err, links) => {
  if(err || !links) {
    console.log('There was an error parsing links for `'+channelName+'`:');
    log(err);
  } else {
    console.log('Links found for channel `'+channelName+'`:');
    let i = 0;
    links.forEach(function(link) {
      console.log(i++ + ') ' + link.description);
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('WHat quality do you want to see? ', (answer) => {
      rl.close();
      if (isNaN(answer) || answer >= links.length) {
        console.log('You have to pick a good number!');
      } else {
        spawn(pathVlc, [links[answer].uri]);
      }
  });
}});
