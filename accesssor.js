'use strict'

/*!
 * exports.
 */

module.exports = define

/**
 * Higher-Order getter/setter.
 *
 * @param {*} initial
 * Initial value.
 *
 * @param {Object} [context]
 * `this` object.
 */

function define (options) {
  options = options || {}
  var initial = options.init
  var context = options.self
  var readonly = options.readonly

  function accessor (input) {
    // setter
    if (arguments.length) {
      if (readonly) throw new TypeError('property is readonly; using a setter is not allowed!')
      accessor.value = input
      return this
    }

    // getter
    return accessor.value
  }

  accessor.value = initial
  return context ? accessor.bind(context) : accessor
}
