import { ArObjectService } from '../service/arObject.service';
import { Response } from '../model/Response';

export class ArObjectController {
  static createArObject = async (req, res, next) => {
    try {
      const result = await ArObjectService.createArObject(req.body, req.files);

      return res
        .status(201)
        .json(new Response(201, 'success', 'create ArObject success', result));
    } catch (err) {
      next(err);
    }
  };

  static getArObject = async (req, res, next) => {
    try {
      const result = await ArObjectService.getArObject(req.params);

      return res
        .status(200)
        .json(new Response(200, 'success', 'find ArObjects success', result));
    } catch (err) {
      next(err);
    }
  };

  static getArObjects = async (req, res, next) => {
    try {
      const result = await ArObjectService.getArObjects();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find ArObjects success', result));
    } catch (err) {
      next(err);
    }
  };

  static updateArObject = async (req, res, next) => {
    try {
      const result = await ArObjectService.updateArObject(req.params, req.body);

      return res
        .status(200)
        .json(new Response(200, 'success', 'update ArObjects success', result));
    } catch (err) {
      next(err);
    }
  };

  static deleteArObject = async (req, res, next) => {
    try {
      await ArObjectService.deleteFiles(req.params);

      const result = await ArObjectService.deleteArObject(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete ArObject success', result));
    } catch (err) {
      next(err);
    }
  };
}
