import { ShortUrlDao } from '../dao/shortUrl.dao';
import { ArObjectDao } from '../dao/arObject.dao';
import { handleError } from '../model/Error';
export class ShortUrlService {
  static createShortUrl = async (req) => {
    let { objectId } = req;

    try {
      const exsited = await ArObjectDao.getArObject(objectId);
      if (exsited == null) {
        return new handleError(404, 'object not exsited');
      }
      const result = await ShortUrlDao.createShortUrl(objectId);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create ShortUrl fail');
    }
  };

  static getShortUrl = async (params) => {
    let { key } = params;
    const result = await ShortUrlDao.getShortUrl(key);

    if (result == null) {
      throw new handleError(404, 'ShortUrl not exsited');
    }
    return result;
  };

  static getShortUrls = async () => {
    const result = await ShortUrlDao.getShortUrls();

    if (result == null) {
      throw new handleError(404, 'ShortUrl not exsited');
    }
    return result;
  };

  static deleteShortUrl = async (params) => {
    const { key } = params;

    const result = await ShortUrlDao.deleteShortUrl(key);

    if (result.n == 0) {
      throw new handleError(404, 'ShortUrl not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };
}
