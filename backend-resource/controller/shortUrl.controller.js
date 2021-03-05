import { ShortUrlService } from '../service/shortUrl.service';
import { Response } from '../model/Response';
export class ShortUrlController {
  static createShortUrl = async (req, res, next) => {
    try {
      const result = await ShortUrlService.createShortUrl(req.body);
      return res
        .status(201)
        .json(new Response(201, 'success', 'create ShortUrl success', result));
    } catch (err) {
      next(err);
    }
  };

  static getShortUrls = async (req, res, next) => {
    try {
      const result = await ShortUrlService.getShortUrls(req.params);

      return res
        .status(200)
        .json(new Response(200, 'success', 'find ShortUrls success', result));
    } catch (err) {
      next(err);
    }
  };

  static getShortUrls = async (req, res, next) => {
    try {
      const result = await ShortUrlService.getShortUrls();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find ShortUrls success', result));
    } catch (err) {
      next(err);
    }
  };

  static deleteShortUrl = async (req, res, next) => {
    try {
      const result = await ShortUrlService.deleteShortUrl(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete ShortUrl success', result));
    } catch (err) {
      next(err);
    }
  };
}
