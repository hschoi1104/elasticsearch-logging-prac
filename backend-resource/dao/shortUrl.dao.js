import ShortUrl from '../model/ShortUrl';

export class ShortUrlDao {
  static createShortUrl = async (objectId) => {
    const shortUrl = new ShortUrl({
      objectId,
    });
    return shortUrl.save();
  };

  static getShrtUrl = async (key) => {
    return ShortUrl.find(
      { key },
      {
        __v: 0,
      }
    );
  };

  static getShrtUrls = async () => {
    return ShortUrl.find(
      {},
      {
        __v: 0,
      }
    ).sort({
      created: -1,
    });
  };

  static deleteShortUrl = async (key) => {
    return ShortUrl.deleteOne({
      key,
    });
  };
}
