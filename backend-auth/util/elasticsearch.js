import { Client } from '@elastic/elasticsearch';
import { logger } from 'express-winston';

const client = new Client({
  node: 'http://localhost:9200',
});

export class ElasticSearch {
  static async requestPut(bodyData) {
    try {
      await client.index(bodyData);
    } catch (err) {
      logger.error(err.message);
    }
  }
}
