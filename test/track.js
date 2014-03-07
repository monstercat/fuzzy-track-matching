
var test = require('tap').test;
var fuzz = require('..');

var overIt = [
   'Over It feat. Dia Frampton'
 , 'Over It'
 , 'The Crystal Method - Over It (Ft. Dia Frampton)'
 , 'Over It (feat. Dia Frampton)'
 , 'The Crystal Method'
 , 'Over It (Original Mix)'
];

var positive = {
 'The Crystal Method - Over It [Free] (Preview)': overIt,
 'The Crystal Method Feat. Dia Frampton - Over It (Original Mix)': overIt,
 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)': overIt,
 'Some Guy - awesome Featuring artist': [
     'awesome featuring artist'
   , 'some guy - awesome '
 ]
};

var negOverIt = [
  "Chugging (Feat. Dia Frampton)",
  "Derpalot feat. dia frampton",
  "Chugging",
  "Without A Cause"
];

var negOne = ["One In A Million"]

var negative = {
   'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)': negOverIt
 , 'The Crystal Method Feat. Dia Frampton - Over It (Original Mix)': negOverIt
 , 'One In A Million (SirensCeol Remix)': negOne
 , 'One In A Million (Jan Waterman Remix)': negOne
};

test('track artist matches', function(t) {
  tester(t, positive, true);
});

test('track artist shouldnt match', function (t) {
  tester(t, negative, false);
});

function tester(t, set, equals) {
  var keys = Object.keys(set);
  var count = 0;

  keys.forEach(function(k) {
    count += set[k].length;
  });

  t.plan(count);

  keys.forEach(function(target) {
    var tester = fuzz.test(target);
    set[target].forEach(function(find){
      var msg = "'" + find + "' === IN === '" + target + "'";
      t.equal(tester(find), equals, msg);
    });
  });
}
