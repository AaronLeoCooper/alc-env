# alc-env
A dependable, simple means of getting ENV variables.

## What
A very basic (but solid) means of getting ENV variables, with a twist:
you can specify your ENV defaults inside your project's `package.json` file.

As I've come to use environment variables more in my JS & Node apps lately,
I decided I didn't want to only rely on variables being passed via the CLI
at runtime. That's why I wrote this simple reusable script to look for my
ENVs wherever they're defined and whatever they're named.

## Compatibility
| OS                 | Will it work? |
| ------------------ | ------------- |
| Mac OSX            | Yes           |
| Linux              | Yes           |
| Windows            | Maybe..?      |
| Anything with Bash | Probably      |

Only tested with Node 6.2+, but will probably work with 4 and possibly lower.

Usage with a front-end app is only recommended if you're using a plugin to
support CommonJS or ES6 imports, or a build tool that bundles modules.

## How

### Install & add to your existing project:
```
npm i --save alc-env
```

### Import:
```js
// CommonJS
var env = require('alc-env')

// or ES6 import
import env from 'alc-env'
```

### (Optionally) Set some default ENV values in your project's `package.json`:
```js
"config": {
  "env_name": "default env value"
},
```

### (Optionally) Pass some ENVs via the command line:
```
env_name="env value" npm start
```

### Call your ENVs freely and safely:
```js
// Get env variable or return a default value if it's not defined
var envA = env('env_name', 'default value');

// Get the first found env variable in the passed array, or return a default value
var envB = env(['env_name', 'fallback_env_name'], 'default value');
```

### What about _setting_ ENVs from inside JS files?
Sorry, that's not a planned feature.

I'm not a fan of setting any ENV variables within the source code of an app. Not
only is it messy to do this, but also consider cases where those variables contain
potentially sensitive data.
Yes, sensitive data isn't necessarily going to fare better inside the `package.json`
file, however this will be up to the user to manage.*

_* In other words: if you're storing your sensitive data in your package file,
or any other file in your app for that matter, absolutely do not upload this
to your public Github or NPM account! This module isn't going to help you there._

## Inspiration
Lots of amazing JS & Node modules and indeed their creators have inspired what I code today,
but the main drive to write this little module was down to working a lot with a
Vagrant-to-Docker migration lately and needing a reliable and predictable method of storing
ENV variables both before and after migration. Since the `package.json` file was always going
to be present, it made a lot of sense to use it as a storage for ENV defaults in any case when
ENVs set from the CLI or from Dockerfiles weren't present.

There's other ENV "management" modules up on NPM and Github, but I couldn't find one
that was in quite this category of providing a fallback to use the `package.json`
properties.

## Dependencies
Nothing inside the `package.json` is mandatory, I've only used unimportant
`devDependencies` to standardise the versions of ESLint & its plugins that
I use for code cleanliness. To keep a production build minimal in your app
it's safe to use the `--production` flag with this module. I can't vouch for
other dependencies your project has however, so use the production flag at
your own risk. 

## Todo
- Add support for custom named `package.json` parameters as secondary ENV source
- Add support for multiple `package.json` source parameters
- Write tests
- _Possibly_ introduce type-setting upon getting ENVs as with other ENV "getter" modules,
but currently this isn't top priority
