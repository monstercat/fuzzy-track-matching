
var fuzz = module.exports;

fuzz.strip = function (s) {
  return s.replace(/[^a-zA-Z0-9]/g, "");
};

fuzz.test = function (target, test, opts) {
  return fuzz.cached.test(target, opts)(test);
};

fuzz.cached = {};

fuzz.cached.invTest = function (test, opts) {
  opts = opts || {};
  var prep = opts.prep || fuzz.strip;
  var tester = new RegExp(prep(test), 'i');
  return function(target) {
    return tester.test(prep(target));
  };
};

fuzz.cached.test = function (target, opts) {
  opts = opts || {};
  var prep = opts.prep || fuzz.strip;
  var prepTarget = prep(target);
  return function(test) {
    var tester = new RegExp(prep(test), 'i');
    return tester.test(prepTarget);
  };
};
