import { createLogger, format, transports } from 'winston';
import captain from 'captains-log';
import buildShipFn from 'sails/lib/hooks/logger/ship';
import moment from 'moment';

const { simple } = format;

export default function (sails) {
  return {
    ready: false,

    initialize: done => {
      let log;
      let logger;
      let captainsOptions = sails.config.log;
      let consoleOptions = {
        level: sails.config.log.level,
        format: sails.config.log.formatter || simple(),
        // stringify: sails.config.log.stringify || false,
        humanReadableUnhandledException:
          sails.config.log.humanReadableUnhandledException !== undefined?
            sails.config.log.humanReadableUnhandledException:true
      };

      // Console Transport
      logger = createLogger({
        transports: [new transports.Console(consoleOptions)],
        levels: {
          error: 0,
          warn: 1,
          debug: 2,
          info: 3,
          verbose: 4,
          silly: 5
        }
      });

      // Custom Transport
      // More information: https://github.com/winstonjs/winston/blob/master/docs/transports.md
      if (Object.prototype.toString.call(sails.config.log.transports) === '[object Array]' && sails.config.log.transports.length > 0) {
        sails.config.log.transports.forEach(transport => logger.add(transport.module, transport.config || {}));
      }

      sails.config.log.custom = logger;
      captainsOptions.custom = logger;

      log = captain(captainsOptions);
      log.ship = buildShipFn(sails.version ? ('v' + sails.version) : '', log.info);
      sails.log = log;

      return done();
    }
  };
}
