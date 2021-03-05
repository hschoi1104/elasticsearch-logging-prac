import express from 'express';
var router = express.Router();
import validate from '../validate/arObject.validate';
import { ArObjectController } from '../controller/arObject.controller';
import authMiddleware from '../middleware/auth.middleware';
import upload from '../middleware/upload.middleware';
import { download } from '../middleware/download.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createArObject,
  upload.array('image'),
  ArObjectController.createArObject
);
router.get(
  '/:objectId',
  authMiddleware(),
  validate.getArObject,
  ArObjectController.getArObject
);
router.get('/', authMiddleware(), ArObjectController.getArObjects);
router.patch(
  '/:objectId',
  authMiddleware(),
  validate.updateArObject,
  ArObjectController.updateArObject
);
router.delete(
  '/:objectId',
  authMiddleware(),
  validate.deleteArObject,
  ArObjectController.deleteArObject
);

router.get('/:bucket/:key', download);

module.exports = router;
