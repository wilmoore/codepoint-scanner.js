'use strict'

/*!
 * imports.
 */

var test = require('tape-catch')

/*!
 * imports (local).
 */

var scan = require('./')

/*!
 * fixtures.
 */

var string = 'Hello world!'
var scanner = scan(string)

/*!
 * tests.
 */

test('codepoints()', function (t) {
  t.deepEqual(scanner.codepoints(), [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33 ], "String's decoded code points")
  t.throws(scanner.codepoints.bind(null, []), TypeError, 'throws when used as a setter')
  t.end()
})

test('string()', function (t) {
  t.equal(scanner.string(), string, 'returns string when called as getter')
  t.end()
})

test('index()', function (t) {
  var original = scanner.index()
  scanner.index(7)
  t.equal(scanner.index(), 7, 'returns current index')
  scanner.index(original)
  t.end()
})

test('next()', function (t) {
  t.equal(scanner.next(), 72, 'returns next code point')
  t.equal(scanner.index(), 0, 'increments index')
  t.end()
})

test('peek()', function (t) {
  t.deepEqual(scanner.peek(5), [ 32 ], 'returns code point at index')
  t.deepEqual(scanner.peek(5, 7), [ 32, 119 ], 'returns given range of code points')
  t.equal(scanner.index(), 0, 'does not change index')
  t.end()
})
