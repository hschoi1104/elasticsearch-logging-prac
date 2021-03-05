import { ArObjectDao } from '../dao/arObject.dao';
import { handleError } from '../model/Error';
import s3 from './../util/s3';
export class ArObjectService {
  static createArObject = async (req, s3Info) => {
    let { name, category, modifiedManager, content } = req;
    try {
      const result = await ArObjectDao.createArObject(
        name,
        category,
        s3Info,
        modifiedManager,
        content
      );
      return result;
    } catch (err) {
      throw new handleError(500, 'Create arObject fail');
    }
  };

  static getArObject = async (params) => {
    let { objectId } = params;
    const result = await ArObjectDao.getArObject(objectId);

    if (result == null) {
      throw new handleError(404, 'ArObject not exsited');
    }
    return result;
  };

  static getArObjects = async () => {
    const result = await ArObjectDao.getArObjects();

    if (result == null) {
      throw new handleError(404, 'ArObject not exsited');
    }
    return result;
  };

  static updateArObject = async (params, body) => {
    const { objectId } = params;
    const { name, category, s3Info, modifiedManager, content } = body;
    const result = await ArObjectDao.updateArObject(
      objectId,
      name,
      category,
      s3Info,
      modifiedManager,
      content
    );

    if (result == null) {
      throw new handleError(404, 'ArObject not exsited');
    }
    const findResult = await ArObjectDao.getArObject(objectId);
    return findResult;
  };

  static deleteArObject = async (params) => {
    const { objectId } = params;

    const result = await ArObjectDao.deleteArObject(objectId);

    if (result.n == 0) {
      throw new handleError(404, 'ArObject not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };

  static deleteFiles = async (params) => {
    const { objectId } = params;
    const result = await ArObjectDao.getArObject(objectId);
    if (result == null || result.s3Info.length == 0) return result;

    let param = {
      Bucket: 'cms-s3',
      Delete: {
        Objects: [],
      },
    };
    result.s3Info.forEach((element) => {
      param.Delete.Objects.push({ Key: element.key });
    });

    s3.deleteObjects(param, function (err, data) {
      if (!err) return data;
    });
  };
}
