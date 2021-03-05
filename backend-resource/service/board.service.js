import { BoardDao } from '../dao/board.dao';
import { handleError } from '../model/Error';
export class BoardService {
  static createPost = async (req) => {
    let { author, title, content, url } = req;

    try {
      const result = await BoardDao.createPost(author, title, content, url);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create post fail');
    }
  };

  static getPost = async (params) => {
    let { _id } = params;
    const result = await BoardDao.getPost(_id);

    if (result == null) {
      throw new handleError(404, 'Post not exsited');
    }
    return result;
  };

  static getPosts = async () => {
    const result = await BoardDao.getPosts();

    if (result == null) {
      throw new handleError(404, 'Post not exsited');
    }
    return result;
  };

  static updatePost = async (params, body) => {
    const { _id } = params;
    const { title, content, url } = body;
    const result = await BoardDao.updatePost(_id, title, content, url);

    if (result == null) {
      throw new handleError(404, 'Post not exsited');
    }
    const findResult = await BoardDao.getPost(_id);
    return findResult;
  };

  static deletePost = async (params) => {
    const { _id } = params;

    const result = await BoardDao.deletePost(_id);

    if (result.n == 0) {
      throw new handleError(404, 'Post not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };
}
