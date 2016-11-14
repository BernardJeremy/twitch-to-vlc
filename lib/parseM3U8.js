const Stream = require('stream')

const M3U8Parser = require('m3u8');

function parseM3U8(m3u) {
  return new Promise(function(resolve, reject) {
    let s = new Stream.Readable;
    let parser = M3U8Parser.createStream();
    s.push(m3u);
    s.push(null);
    s.pipe(parser);

    parser.on('m3u', function(m3u) {
      // fully parsed m3u file
      let linkArray = [];
      let items = m3u.items.StreamItem;
      for (let i = 0; i < items.length; ++i){
        let linkObj = {};
        linkObj.type = items[i].attributes.attributes.video;
        linkObj.url = items[i].properties.uri;
        linkArray[linkObj.type] = linkObj;
      }
      resolve(linkArray);
    });
  });
}

module.exports = parseM3U8;
