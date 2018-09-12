const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ level: 'error', filename: './logs/error.log' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  }));
}

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
