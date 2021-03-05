import ArObject from '../model/ArObject';

export class ArObjectDao {
  static createArObject = async (
    name,
    category,
    s3Info,
    modifiedManager,
    content
  ) => {
    const arObject = new ArObject({
      name,
      category,
      s3Info,
      modifiedManager,
      content,
    });
    return await arObject.save();
  };

  static getArObjects = async () => {
    return await ArObject.find(
      {},
      {
        __v: 0,
      }
    ).sort({
      objectId: 1,
    });
  };

  static getArObject = async (objectId) => {
    return await ArObject.findOne(
      { objectId },
      {
        __v: 0,
      }
    );
  };

  static updateArObject = async (
    objectId,
    name,
    category,
    s3Info,
    modifiedManager,
    content
  ) => {
    return await ArObject.findOneAndUpdate(
      { objectId },
      { name, category, s3Info, modifiedManager, content },
      {
        __v: 0,
      }
    );
  };

  static deleteArObject = async (objectId) => {
    return await ArObject.deleteOne({
      objectId,
    });
  };
}
