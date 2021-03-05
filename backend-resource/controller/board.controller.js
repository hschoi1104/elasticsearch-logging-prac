import { BoardService } from '../service/board.service';
import { Response } from '../model/Response';

export class BoardController {
  static createPost = async (req, res, next) => {
    try {
      const result = await BoardService.createPost(req.body);
      return res
        .status(201)
        .json(new Response(201, 'success', 'create post success', result));
    } catch (err) {
      next(err);
    }
  };

  static getPost = async (req, res, next) => {
    try {
      const result = await BoardService.getPost(req.params);

      return res
        .status(200)
        .json(new Response(200, 'success', 'find posts success', result));
    } catch (err) {
      next(err);
    }
  };

  static getPosts = async (req, res, next) => {
    try {
      const result = await BoardService.getPosts();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find posts success', result));
    } catch (err) {
      next(err);
    }
  };

  static updatePost = async (req, res, next) => {
    try {
      const result = await BoardService.updatePost(req.params, req.body);

      return res
        .status(200)
        .json(new Response(200, 'success', 'update posts success', result));
    } catch (err) {
      next(err);
    }
  };

  static deletePost = async (req, res, next) => {
    try {
      const result = await BoardService.deletePost(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete post success', result));
    } catch (err) {
      next(err);
    }
  };
}
