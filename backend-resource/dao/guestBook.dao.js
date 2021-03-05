import GuestBook from '../model/GuestBook';

export class GuestBookDao {
  static createPost = async (name, content) => {
    const guestBook = new GuestBook({
      name,
      content,
    });
    return guestBook.save();
  };

  static getPosts = async () => {
    return GuestBook.find(
      {},
      {
        __v: 0,
      }
    ).sort({
      created: -1,
    });
  };

  static deletePost = async (_id) => {
    return GuestBook.deleteOne({
      _id,
    });
  };
}
