
var fuzz = module.exports;
var debug = require('debug')('fuzzytrack');

fuzz.stripParens = function (s) {
  return s.replace(/\([^\)]*\)/g, "");
};

fuzz.stripKeywords = function (s) {
  return s.replace(/feat\.|vs\.|featuring|ft\./ig, "");
};

fuzz.stripCharacters = function (s) {
  return s.replace(/[^a-zA-Z0-9\ ]/g, "");
};

function tokenize(a) {
  a = fuzz.stripParens(a);
  a = fuzz.stripKeywords(a);
  a = fuzz.stripCharacters(a);
  return a.toLowerCase().split(/\ +/).filter(function(t) {
    return t !== '';
  });
}

fuzz.test = function(target) {
  var targetTokens = tokenize(target);

  return function(find) {
    var findTokens = tokenize(find);

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
