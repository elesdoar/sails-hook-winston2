# sails-hook-winston

[![Build Status](http://img.shields.io/travis/elesdoar/sails-hook-winston2/master.svg?style=flat)](https://travis-ci.org/elesdoar/sails-hook-winston2)
[![Coverage Status](https://coveralls.io/repos/github/elesdoar/sails-hook-winston2/badge.svg?branch=master)](https://coveralls.io/github/elesdoar/sails-hook-winston2?branch=master)
[![Dependency status](http://img.shields.io/david/elesdoar/sails-hook-winston2.svg?style=flat)](https://david-dm.org/elesdoar/sails-hook-winston2)
[![Dev Dependencies Status](http://img.shields.io/david/dev/elesdoar/sails-hook-winston2.svg?style=flat)](https://david-dm.org/elesdoar/sails-hook-winston2#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/sails-hook-winston2.svg?style=flat)](https://www.npmjs.org/package/sails-hook-winston2)
[![Gittip](http://img.shields.io/gittip/elesdoar.svg?style=flat)](https://www.gittip.com/elesdoar/)

> Integrates winston logging system with your Sails application, based in [sails-hook-winston](https://github.com/Kikobeats/sails-hook-winston) by @Kikobeats.

## Install

> **Note**: This library requires sails >= 0.11.0

```bash
npm install sails-hook-winston2
```
## Usage

[winston](https://github.com/winstonjs/winston) is one of the most powerful logging libraries for NodeJS. You can unlock the features of winston in your Sails application when you use this hook.

All [available winston transports](https://github.com/winstonjs/winston/blob/master/docs/transports.md) can be configured through the `transports` option.
The console transport is included by default (by default based on the Sails log options).

## API

This library extend `config/log` and use the winston API for setup the Transport. This is an example of configuration:

```js
var path = require('path');
var pkgJSON = require(path.resolve('package.json'));

module.exports.log = {

  // This options are for Console transport that is used by default
  level: 'silly', // you are familiar with this value, right?
  timestamp: true, // if you want to output the timestamp in the console transport
  colorize: true, // colorize console transport
  prettyPrint: true, // pretty print console transport
  showLevel: true, // show level in console transport

  // ... other console transport options.

  // Transports
  // more information: https://github.com/winstonjs/winston/blob/master/docs/transports.md
  transports: [
    {
      module: require('winston-daily-rotate-file'),
      config: {
        dirname: path.resolve('logs'),
        datePattern: '.yyyy-MM-dd.log',
        filename: pkgJSON.name,
        prettyPrint: true,
        timestamp: true,
        level: 'silly'
      }
    },
    {
      module: require('winston-logio').Logio,
      config: {
        port: 28777,
        node_name: pkgJSON.name,
        host: '127.0.0.1'
      }
    }
  ]
};
```

Note how the options are different for each transport. For example, you can use `info` level in console but store `silly` level in DailyFileRotate.

## License

MIT © [Michael Salgado](http://elesdoar.github.io)
