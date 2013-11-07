
var test = require('tap').test;
var fuzz = require('..');

var overIt = [
   'Over It feat. Dia Frampton'
 , 'Over It'
 , 'The Crystal Method - Over It (Ft. Dia Frampton)'
 , 'Over It (Original Mix)'
];

var examples = {
 'The Crystal Method Feat. Dia Frampton - Over It (Original Mix)': overIt,
 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)': overIt,
 'Some Guy - awesome Featuring artist': [
     'awesome featuring artist'
   , 'some guy - awesome '
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
    var tester = fuzz.test(target);
    examples[target].forEach(function(find){
      var msg = "'" + find + "' === IN === '" + target + "'";
      t.equal(tester(find), true, msg);
    });
  });
});
