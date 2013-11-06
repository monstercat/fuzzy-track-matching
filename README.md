
# fuzzy-track-matching

Simple fuzzy string matching on track titles

## Example

```js
var fuzzy = require('fuzzy-track-matching')

var target = 'The Crystal Method - Over It (feat. Dia Frampton of Meg & Dia)'
var find = 'Over It feat. Dia Frampton'

var matches = fuzzy.test(target, find)
// matches is true
```

