import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
});

export class ElasticSearch {
  static async RequestPut(bodyData) {
    try {
      await client.index(bodyData);
    } catch (err) {
      console.log();
    }
  }
}
