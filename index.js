
var fuzz = module.exports;
var debug = require('debug')('fuzzytrack');

fuzz.stripParens = function (s) {
  return s.replace(/\([^\)]*\)/g, "");
};

fuzz.stripKeywords = function (s) {
  return s.replace(/(feat\.|vs\.|featuring|ft\.)[\s\w]+/ig, "");
};

fuzz.stripCharacters = function (s) {
  return s.replace(/[^a-zA-Z0-9\ ]/g, "");
};

function tags(tokens) {
  return {
    remix: ~tokens.indexOf("remix")
  }
}

/**
 * Checks to see if two sets of tags are compatible.
 * Incombatible tags mean a non-match
 *
 * @param {Object} tag object for track a
 * @param {Object} tag object for track b
 * @param {Boolean} true if tags are compatible
 * @api public
 */

function compatible(a, b) {
  return a.remix === b.remix;
}

function tokenize(a, opts) {
  opts = opts || {};
  if (!opts.parens)
    a = fuzz.stripParens(a);
  a = fuzz.stripKeywords(a);
  a = fuzz.stripCharacters(a);
  return a.toLowerCase().split(/\ +/).filter(function(t) {
    return t !== '';
  });
}

fuzz.test = function(target) {
  var targetTokens = tokenize(target);
  var targetTags = tags(tokenize(target, { parens: true }));

  return function(find) {
    var findTokens = tokenize(find);
    var findTags = tags(findTokens);

    if (!compatible(targetTags, findTags))
      return false;

    var matches = 0;
    findTokens.forEach(function(t) {
      matches += targetTokens.some(function(tt) {
        return t === tt;
      }) ? 1 : 0;
    });

    var len = findTokens.length / 2;
    debug(findTokens);
    debug(targetTokens);
    debug(matches + " >= " + len + " == " + (matches >= len));
    return matches >= len;
  };
};
