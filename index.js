'use strict'

/*!
 * imports.
 */

var accessor = require('function-accessor')
var decode = require('punycode').ucs2.decode

/*!
 * exports.
 */

module.exports = scanner

/**
 * Wraps the given string in a {Scanner} instance.
 *
 * @param {String} string
 * String to scan.
 *
 * @return {Scanner}
 * Scanner instance.
 */

function scanner (string) {
  return new Scanner(string)
}

/**
 * Scanner constructor.
 *
 * @param {String} string
 * String to scan.
 *
 * @return {Scanner}
 * Scanner instance.
 */

function Scanner (string) {
  this.codepoints = accessor({
    init: decode(string),
    readonly: true,
    self: this
  })

  this.index = accessor({
    init: 0,
    check: isValidIndex,
    self: this
  })

  this.length = accessor({
    init: this.codepoints().length,
    readonly: true,
    self: this
  })

  this.string = accessor({
    init: string,
    readonly: true,
    self: this
  })
}

/**
 * Whether given index is valid.
 *
 * @return {Boolean}
 * Whether given index is valid.
 */

function isValidIndex (index) {
  return index >= 0 && index <= (this.length() - 1)
}

/**
 * Whether index is at beginning of string.
 *
 * @return {Boolean}
 * Whether index is at beginning of string.
 */

Scanner.prototype.bos = function bos () {
  return this.index() === 0
}

/**
 * Whether index is at end of string.
 *
 * @return {Boolean}
 * Whether index is at end of string.
 */

Scanner.prototype.eos = function eos () {
  return this.index() === this.length() - 1
}

/**
 * Change index to last character of the string.
 *
 * @return {Scanner}
 * Scanner Instance.
 */

Scanner.prototype.$ = function $ () {
  return this.index(this.length() - 1)
}

/**
 * Change index to first character of the string.
 *
 * @return {Scanner}
 * Scanner Instance.
 */

Scanner.prototype.reset = function reset () {
  return this.index(0)
}

/**
 * Increase scanner index by 1 and return codepoint at the new index.
 *
 * @return {Scanner}
 * Codepoint at new index.
 */

Scanner.prototype.next = function next () {
  return this.index(this.index() + 1).codepoints()[this.index()]
}

/**
 * Return range of code points at index or between start (inclusive) and end (exclusive) indexes without moving index.
 *
 * @param {Number} start
 * Starting index.
 *
 * @param {Number} [end]
 * Ending index.
 *
 * @return {Array}
 * Code points.
 */

Scanner.prototype.peek = function peek (start, end) {
  start = arguments.length ? start : this.index()
  return this.codepoints().slice(start, 1 in arguments ? end : start + 1)
}

/**
 * Return code point at given index without moving index.
 *
 * @param {Number} index
 * Index.
 *
 * @return {Number}
 * Code point.
 */

Scanner.prototype.at = function at (index) {
  return this.peek(index)[0]
}
