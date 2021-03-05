import Board from '../model/Board';

export class BoardDao {
  static createPost = async (author, title, content, url) => {
    const board = new Board({
      author,
      title,
      content,
      url,
    });
    return await board.save();
  };

  static getPost = async (_id) => {
    return await Board.find({ _id });
  };

  static getPosts = async () => {
    return await Board.find().sort({ created: -1 });
  };

  static updatePost = async (_id, title, content, url) => {
    const modified = new Date();
    return Board.findOneAndUpdate(
      {
        _id,
      },
      {
        title,
        content,
        url,
        modified,
      },
      {
        new: true,
      }
    );
  };

  static deletePost = async (_id) => {
    return Board.deleteOne({
      _id,
    });
  };
}
