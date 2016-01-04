'use strict'

/*!
 * imports.
 */

var accessor = require('./accesssor')
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
  this.codepoints = accessor(decode(string), this)
  this.index = accessor(-1, this)
  this.string = accessor(string, this)
}

/**
 * Increase scanner index by 1 and return codepoint at the new index.
 *
 * @return {Scanner}
 * Codepoint at new index.
 */

Scanner.prototype.next = function next () {
  this.index(this.index() + 1)
  return this.codepoints()[this.index()]
}

/**
 * Return code point at given index or between start (inclusive) and end (exclusive) indexes without moving index.
 *
 * @param {Number} start
 * Starting index.
 *
 * @param {Number} [end]
 * Ending index.
 *
 * @return {Scanner}
 * Codepoint at new index.
 */

Scanner.prototype.peek = function peek (start, end) {
  return this.codepoints().slice(start, 1 in arguments ? end : start + 1)
}
