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
  t.deepEqual(scanner.codepoints(), [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33 ])
  t.end()
})

test('string()', function (t) {
  t.equal(scanner.string(), string)
  t.end()
})

test('index()', function (t) {
  var original = scanner.index()
  scanner.index(7)
  t.equal(scanner.index(), 7)
  scanner.index(original)
  t.end()
})

test('next()', function (t) {
  t.equal(scanner.next(), 72)
  t.equal(scanner.index(), 0)
  t.end()
})

test('peek()', function (t) {
  t.deepEqual(scanner.peek(5), [ 32 ])
  t.deepEqual(scanner.peek(5, 7), [ 32, 119 ])
  t.equal(scanner.index(), 0)
  t.end()
})
