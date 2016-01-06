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
var codepoints = [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33 ]

/*!
 * tests.
 */

test('.codepoints()', function (t) {
  var scanner = scan(string)
  t.deepEqual(scanner.codepoints(), codepoints, "String's decoded code points")
  t.throws(scanner.codepoints.bind(null, []), RangeError, 'Throws RangeError when attempting to set readonly attribute')
  t.end()
})

test('.length()', function (t) {
  var scanner = scan(string)
  t.equal(scanner.length(), 12, 'String length corresponds to number of characters')
  var shouldThrowError = scanner.length.bind(null, 100)
  t.throws(shouldThrowError, RangeError, 'Throws RangeError when attempting to set length')
  t.end()
})

test('.string()', function (t) {
  var scanner = scan(string)
  t.equal(scanner.string(), string, 'Returns string when called as getter')
  var shouldThrowError = scanner.string.bind(null, 'not the original string')
  t.throws(shouldThrowError, RangeError, 'Throws RangeError when attempting to set string')
  t.end()
})

test('.index()', function (t) {
  var scanner = scan(string)
  t.equal(scanner.index(), 0, 'Starts at index 0')
  scanner.index(7)
  t.equal(scanner.index(), 7, 'Returns the previously set index')
  var shouldThrowError = scanner.index.bind(null, 999)
  t.throws(shouldThrowError, RangeError, 'Throws RangeError when attempting to index past length of string')
  t.end()
})

test('eos()', function (t) {
  var scanner

  scanner = scan(string)
  t.equal(scanner.eos(), false, 'Index is not at end of string')
  scanner.index(scanner.length() - 1)
  t.equal(scanner.eos(), true, 'Index is at end of string')

  scanner = scan('') // empty string
  t.equal(scanner.eos(), true, 'Index is automatically at end of string when string is empty')
  t.end()
})

test('.$()', function (t) {
  var scanner = scan(string).$()
  t.equal(scanner.eos(), true, 'Index is moved to end of string')
  t.end()
})

test('bos()', function (t) {
  var scanner = scan(string)
  t.equal(scanner.bos(), true, 'Index is at beginning of string')
  scanner.index(7)
  t.equal(scanner.bos(), false, 'Index is no longer at beginning of string')
  t.end()
})

test('.reset()', function (t) {
  var scanner = scan(string)
  scanner.next()
  t.equal(scanner.reset().bos(), true, 'Index is moved to beginning of string')
  t.end()
})

test('next()', function (t) {
  var scanner = scan(string)
  t.equal(scanner.next(), codepoints[1], 'returns next code point')
  t.equal(scanner.index(), 1, 'increments index')
  t.end()
})

test('peek()', function (t) {
  var scanner = scan(string)
  t.deepEqual(scanner.peek(), [ codepoints[0] ], 'Returns code point at starting index')
  t.deepEqual(scanner.peek(5), [ 32 ], 'Returns code point at index')
  t.deepEqual(scanner.peek(5, 7), [ 32, 119 ], 'Returns given range of code points')
  t.equal(scanner.index(), 0, 'Does not change index')
  t.end()
})

test('at()', function (t) {
  var scanner = scan(string)
  t.deepEqual(scanner.at(5), codepoints[5], 'Returns code point at given index')
  t.end()
})
