import User from '../model/User';

export class UserDao {
  static createUser = async (id, password, salt, name, isManager) => {
    const user = new User({
      id,
      password,
      salt,
      name,
      isManager,
    });
    return user.save();
  };

  static getUser = async (id) => {
    return User.findOne(
      {
        id,
      },
      { password: 0, __v: 0, _id: 0, salt: 0 }
    );
  };

  static getUsers = async () => {
    return User.find({}, { password: 0, __v: 0, _id: 0, salt: 0 });
  };

  static updateUser = async (id, isManager) => {
    return User.findOneAndUpdate(
      {
        id,
      },
      {
        isManager,
      },
      {
        new: true,
      }
    );
  };

  static deleteUser = async (id) => {
    return User.deleteOne({
      id,
    });
  };

  static getUserforAuth = async (id) => {
    return User.findOne({
      id,
    });
  };
}
