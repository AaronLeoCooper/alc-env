/**
 * Helper to get environment variables
 * Searches for envs first in CLI arguments, secondly in package.json config
 *
 * @param {string, array} varNames - 1 or more env variable names to attempt to find
 * @param {any} defaultValue - If none of the env variables are found by name, return this value
 */
function alcEnv (varNames, defaultValue) {
  if (!varNames) return null

  // Normalise varName into an array
  if (typeof varNames === 'string') {
    varNames = [varNames]
  }

  var output = undefined

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

  // Output wasn't assigned, return the default value if specified
  if (typeof defaultValue !== 'undefined') {
    return defaultValue
  }

  return null // No default was provided, last resort return null
}

module.exports = alcEnv
