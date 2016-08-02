# alc-env
A dependable, simple means of getting ENV variables

## What
A very basic means of getting ENV variables, with a twist: you can specify your ENV defaults inside your project's `package.json` file.

## How
1. Install:
  ```bash
  npm i --save alc-env
  ```
2. Initialise:
  ```js
  // CommonJS
  var env = require('alc-env')

  // or ES6 import
  import env from 'alc-env'
  ```
3. (Optionally) Set some default ENV values in your project's `package.json`:
  ```js
  ...
  "config": {
    "env_name": "default env value"
  },
  ...
  ```
4. Grab your ENVs:
  ```js
  // Get env variable or return a default value if it's not defined
  var envA = env('env_name', 'default value');

  // Get the first found env variable in the passed array, or return a default value
  var envB = env(['env_name', 'fallback_env_name'], 'default value');
  ```

## Todo
- Add support for custom named `package.json` parameters as secondary ENV source
- Add support for multiple `package.json` source parameters
- Write tests
