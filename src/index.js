import winston from 'winston';
import captain from 'captains-log';
import buildShipFn from 'sails/lib/hooks/logger/ship';
import moment from 'moment';

export default function (sails) {
  return {
    ready: false,

    initialize: done => {
      let log;
      let logger;
      let captainsOptions = sails.config.log;
      let consoleOptions = {
        level: sails.config.log.level,
        formatter: sails.config.log.formatter || undefined,
        colorize: sails.config.log.colorize || false,
        prettyPrint: sails.config.log.prettyPrint || false,
        timestamp: sails.config.log.timestamp || false,
        json: sails.config.log.json || false,
        stringify: sails.config.log.stringify || false,
        depth: sails.config.log.depth || null,
        humanReadableUnhandledException: sails.config.log.humanReadableUnhandledException || false,
        showLevel: sails.config.log.showLevel !== undefined? sails.config.log.showLevel:true
      };

      // Console Transport
      logger = new winston.Logger({
        transports: [new winston.transports.Console(consoleOptions)],
        levels: {
          error: 1,
          warn: 2,
          debug: 3,
          info: 4,
          verbose: 5,
          silly: 6
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
