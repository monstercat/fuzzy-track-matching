
var fuzz = module.exports;

fuzz.stripParens = function (s) {
  return s.replace(/\([^\)]*\)/g, "");
};

fuzz.stripKeywords = function (s) {
  return s.replace(/feat\.|vs\.|featuring|ft\./ig, "");
};

fuzz.stripCharacters = function (s) {
  return s.replace(/[^a-zA-Z0-9 ]/g, "");
};

fuzz.strip = function(s) {
  s = fuzz.stripKeywords(s);
  s = fuzz.stripCharacters(s);
  return s;
};

fuzz.invTest = function (test, opts) {
  opts = opts || {};
  var prep = opts.prep || fuzz.strip;
  var tester = new RegExp(prep(test), 'i');
  return function(target) {
    return tester.test(prep(target));
  };
};

fuzz.test = function (target, opts) {
  opts = opts || {};
  var prep = opts.prep || fuzz.strip;
  var prepTarget = prep(target);
  return function(test) {
    var tester = new RegExp(prep(test), 'i');
    return tester.test(prepTarget);
  };
};
