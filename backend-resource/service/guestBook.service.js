import { GuestBookDao } from '../dao/guestBook.dao';
import { handleError } from '../model/Error';
export class GuestBookService {
  //User
  static createPost = async (req) => {
    let { name, content } = req;

    try {
      const result = await GuestBookDao.createPost(name, content);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create post fail');
    }
  };

  static getPosts = async () => {
    const result = await GuestBookDao.getPosts();

    if (result == null) {
      throw new handleError(404, 'Post not exsited');
    }
    return result;
  };

  static deletePost = async (params) => {
    const { _id } = params;

    const result = await GuestBookDao.deletePost(_id);

    if (result.n == 0) {
      throw new handleError(404, 'Post not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };
}
