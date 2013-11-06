
var test = require('tap').test;
var fuzz = require('..');

var examples = {
 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)': [
     'Over It feat. Dia Frampton'
   , 'Over It'
   , 'overit'
   , 'Crystal Method'
 ]
};

test('track artist matches', function(t) {
  var keys = Object.keys(examples);
  var count = 0;

  keys.forEach(function(k) {
    count += examples[k].length;
  });

  t.plan(count);

  keys.forEach(function(target) {
    var tester = fuzz.cached.test(target);
    examples[target].forEach(function(find){
      t.equal(tester(find), true, find + " not found in '" + target + "'");
    });
  });
});
