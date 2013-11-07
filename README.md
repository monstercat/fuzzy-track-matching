
# fuzzy-track-matching

Simple fuzzy string matching on track titles

[![build status](https://secure.travis-ci.org/jb55/fuzzy-track-matching.png)](http://travis-ci.org/jb55/fuzzy-track-matching)

## Example

```js
var fuzzy = require('fuzzy-track-matching')

var target = 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)'

// test a target
var tester = fuzzy.test(target)
var matches = tester('over it feat. Dia Frampton') && tester('The crystal method')
// matches is true
```

