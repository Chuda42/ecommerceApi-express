import winston from 'winston';
import Config from './config/config.js'

let log = null;

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'white',
  }
}

const prodLogger = () => {
  const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'http',
        format: winston.format.combine(
          winston.format.colorize({colors: customLevelOptions.colors}),
          winston.format.simple()
        )
  
      }),
      new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'warning',
        format: winston.format.simple()
      }),
    ]
  })
  return logger;
}

const devLogger = () => {
  const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({colors: customLevelOptions.colors}),
          winston.format.simple()
        )
      }),
    ]
  })
  return logger;
}

if (Config.LOGS_ENV === 'prod') {
  log = prodLogger();
} else if (Config.LOGS_ENV === 'dev') {
  log = devLogger();
}

export const logger = log;

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next()
}
