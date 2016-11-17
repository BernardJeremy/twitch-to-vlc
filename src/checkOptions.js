/**
 * Check is options are valid.
 * @param {Object} options
 * @return {Boolean}
 */
function checkOptions (options) {
  let ok = false;
  options.hasToken = false;

  if (typeof options.options !== "undefined"){
    ok = true;
  }

  if (typeof options.token !== "undefined" && options.token !== null){
    options.hasToken = true;
  }

  return ok;
}

module.exports = checkOptions;
