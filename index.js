'use strict'

/**
 * Helper to get environment variables
 * Searches for envs first in CLI arguments, secondly in package.json config
 *
 * @param {string, array} varNames - 1 or more env variable names to attempt to find
 * @param {any} defaultValue - If none of the env variables are found by name, return this value
 */
function alcEnv (varNames, defaultValue) {
  var output = undefined

  // Handle undefined defaultValue
  defaultValue = typeof defaultValue === 'undefined'
    ? null
    : defaultValue

  if (!varNames) return defaultValue

  // Normalise varName into an array
  if (typeof varNames === 'string') {
    varNames = [varNames]
  }

  varNames.forEach(function (thisVarName) {
    if (output !== undefined) return // Don't proceed if output already assigned

    // First check for the variable in process.env
    if (typeof process.env[thisVarName] !== 'undefined') {
      output = process.env[thisVarName]
      return
    }

    // Next, try finding variable in package.json config object
    if (typeof process.env['npm_package_config_' + thisVarName] !== 'undefined') {
      output = process.env['npm_package_config_' + thisVarName]
      return
    }

  // This variable isn't found, goto next variable name in array
  })

  if (output !== undefined) return output // Output was assigned, return it

  return defaultValue // Last resort, return defaultValue
}

module.exports = alcEnv
