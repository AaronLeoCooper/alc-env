'use strict'

var uncached = require('require-uncached')
var sinon = require('sinon')
var chai = require('chai')

var assert = chai.assert

var mock = {
  varName: 'test_name',
  varNamesArr: ['test_name', 'test_name_2'],
  defaultValue: 'mocked',
  defaultValueAlt: 'mocked again'
}

describe('alcEnv', function () {
  var alcEnv
  var result

  beforeEach(function () {
    alcEnv = uncached('../index.js')
  })

  afterEach(function () {
    result = undefined
    process.env[mock.varName] = undefined
    process.env['npm_package_config_' + mock.varName] = undefined
  })

  it('retuns null when no parameters passed', function () {
    result = alcEnv()

    assert.equal(result, null)
  })

  it('retuns null when only empty array passed & no defaultValue', function () {
    result = alcEnv([])

    assert.equal(result, null)
  })

  it('retuns passed defaultValue when varNames empty array', function () {
    result = alcEnv([], mock.defaultValue)

    assert.equal(result, mock.defaultValue)
  })

  it('retuns passed defaultValue when varNames null', function () {
    result = alcEnv(null, mock.defaultValue)

    assert.equal(result, mock.defaultValue)
  })

  it('retuns passed defaultValue when varNames undefined', function () {
    result = alcEnv(undefined, mock.defaultValue)

    assert.equal(result, mock.defaultValue)
  })

  it('retuns from process.env (CLI)', function () {
    process.env[mock.varName] = mock.defaultValue

    result = alcEnv(mock.varName, mock.defaultValueAlt)

    assert.equal(result, mock.defaultValue)
  })

  it.skip('retuns from package.json config', function () {
    process.env['npm_package_config_' + mock.varName] = mock.defaultValue

    result = alcEnv(mock.varName, mock.defaultValueAlt)

    assert.equal(result, mock.defaultValue)
  })
})
