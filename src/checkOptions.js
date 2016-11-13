function checkOptions (options) {
  let ok = false;
  options.isChannel = false;
  options.isVideo = false;
  options.hasToken = false;
  options.hasQuality = false;

  if (typeof options.channel !== "undefined" && options.channel !== null){
    ok = true;
    options.isChannel = true;
  } else if (typeof options.video !== "undefined" && options.video !== null){
    ok = true;
    options.isVideo = true;
  }

  if (typeof options.token !== "undefined" && options.token !== null){
    options.hasToken = true;
  }

  if (typeof options.quality !== "undefined" && options.quality !== null){
    options.hasQuality = true;
  }

  return ok;
}

module.exports = checkOptions;
