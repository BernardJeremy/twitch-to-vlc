function log (tag, str) {
  if (typeof str !== "undefined") {
    console.log("[" + tag + "]", str);
  } else {
    console.log(tag);
  }
}

function debug (str) {
    log("DEBUG", str);
}

module.exports.log = log;
module.exports.debug = debug;
