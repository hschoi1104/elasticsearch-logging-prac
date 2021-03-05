import { GuestBookService } from '../service/guestBook.service';
import { Response } from '../model/Response';
export class GuestBookController {
  static createPost = async (req, res, next) => {
    try {
      const result = await GuestBookService.createPost(req.body);
      return res
        .status(201)
        .json(new Response(201, 'success', 'create post success', result));
    } catch (err) {
      next(err);
    }
  };

  static getPosts = async (req, res, next) => {
    try {
      const result = await GuestBookService.getPosts();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find posts success', result));
    } catch (err) {
      next(err);
    }
  };

  static deletePost = async (req, res, next) => {
    try {
      const result = await GuestBookService.deletePost(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete post success', result));
    } catch (err) {
      next(err);
    }
  };
}
