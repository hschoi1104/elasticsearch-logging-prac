import { ElasticSearch } from './../util/elasticsearch';

// export type ElasticSearchAPILogType = {
//   apiName: string,
//   method: string,
//   url: string,
//   header: Object,
//   errorMessage?: string,
// };

export class LoggingService {
  static async putAPILog(req) {
    try {
      console.log(req);
      const bodyData = {
        index: 'server_api_logs',
        body: {
          ...req,
          timestamp: new Date(),
        },
      };
      await ElasticSearch.RequestPut(bodyData);
    } catch (err) {
      console.log('fail');
    }
  }

  static async putErrorLog(err, req) {
    try {
      const { url, method } = req;
      const bodyData = {
        index: 'server_error_logs',
        body: {
          url,
          method,
          ...err,
          timestamp: new Date(),
        },
      };
      await ElasticSearch.RequestPut(bodyData);
    } catch (err) {
      console.log('fail');
    }
  }
}
