# codepoint-scanner
> UTF-16 code-point based lexical string scanner.

[![Build Status](http://img.shields.io/travis/wilmoore/codepoint-scanner.js.svg)](https://travis-ci.org/wilmoore/codepoint-scanner.js) [![Code Climate](https://codeclimate.com/github/wilmoore/codepoint-scanner.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/codepoint-scanner.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install codepoint-scanner --save
```

> You can also [download the files manually](https://github.com/wilmoore/codepoint-scanner.js/releases).

###### npm stats

[![npm](https://img.shields.io/npm/v/codepoint-scanner.svg)](https://www.npmjs.org/package/codepoint-scanner) [![NPM downloads](http://img.shields.io/npm/dm/codepoint-scanner.svg)](https://www.npmjs.org/package/codepoint-scanner) [![David](https://img.shields.io/david/wilmoore/codepoint-scanner.js.svg)](https://david-dm.org/wilmoore/codepoint-scanner.js)

## Usage

```js
var scan = require('codepoint-scanner')
var scanner = scan('Hello world!')
```

## API

###### scanner.string()

```js
scanner.string()
// => 'Hello world!'
```

###### scanner.codepoints()

```js
scanner.codepoints()
// => [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33 ]
```

###### scanner.index()

```js
scanner.index()
// => -1
```

###### scanner.next()

```js
scanner.next()
// => 72

scanner.next()
// => 101

scanner.index()
// => 1
```

###### scanner.bos()

```js
scanner.bos()
// => true

scanner.next()
// => 72

scanner.bos()
// => false
```

###### scanner.reset()

```js
scanner.bos()
// => false

scanner.reset().bos()
// => true
```

###### scanner.eos()

```js
scanner.eos()
// => false

scanner.index(scanner.length - 1).eos()
// => true
```

###### scanner.$()

```js
scanner.eos()
// => false

scanner.$().eos()
// => true
```

###### scanner.peek()

```js
scanner.index()
// => 0

scanner.peek()
// => [ 72 ]

scanner.peek(5)
// => [ 32 ]

scanner.peek(5, 7)
// => [ 32, 119 ]

scanner.index()
// => 1
```

###### scanner.at()

```js
scanner.index()
// => 0

scanner.at(5)
// => 32
```

## Contributing

> SEE: [contributing.md](contributing.md)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/codepoint-scanner.js.svg)](https://github.com/wilmoore/codepoint-scanner.js/blob/master/license)
