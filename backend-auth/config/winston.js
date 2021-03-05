import winston from 'winston';
const { ElasticsearchTransport } = require('winston-elasticsearch');
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
});

const { combine, timestamp, printf } = winston.format;

// Define log format
const requestLogFormat = printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Define log format
const errorLogFormat = printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Define log format
const logFormat = printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const esTransportOpts = {
  level: 'info',
  client,
  transformer: (logData) => {
    console.log(logData);
    return {
      '@timestamp': new Date().getTime(),
      severity: logData.level,
      message: `[${logData.level}] LOG Message: ${logData.message}`,
      fields: {},
    };
  },
};
const esTransport = new ElasticsearchTransport(esTransportOpts);
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    requestLogFormat
  ),
  transports: [esTransport],
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

export { logger, stream };
