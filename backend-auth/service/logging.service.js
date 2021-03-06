import { logger } from 'express-winston';
import { ElasticSearch } from './../util/elasticsearch';

export class LoggingService {
  static async api(req) {
    try {
      const { originalUrl, headers, method } = req;
      const bodyData = {
        index: 'auth-api-log',
        body: {
          method,
          originalUrl,
          headers,
          timestamp: new Date(),
        },
      };
      await ElasticSearch.requestPut(bodyData);
    } catch (err) {
      logger.error(err.message);
    }
  }

  static async error(err, req) {
    try {
      const { originalUrl, method, headers } = req;
      const bodyData = {
        index: 'auth-error-log',
        body: {
          originalUrl,
          method,
          headers,
          ...err,
          timestamp: new Date(),
        },
      };
      await ElasticSearch.requestPut(bodyData);
    } catch (err) {
      logger.error(err.message);
    }
  }
}
