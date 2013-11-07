
# fuzzy-track-matching

Simple fuzzy string matching on track titles

## Example

```js
var fuzzy = require('fuzzy-track-matching')

var target = 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)'

# test a target
var tester = fuzzy.test(target)
var matches = tester('over it feat. Dia Frampton') && tester('The crystal method')
// matches is true

# test with changing targets
var tester = fuzzy.invTest('over it feat. dia')
var matches = tester(target)
```

