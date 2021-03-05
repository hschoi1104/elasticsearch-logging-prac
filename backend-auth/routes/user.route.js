import express from 'express';
var router = express.Router();
import validate from './../validate/user.validate';
import { UserController } from '../controller/user.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post('/', validate.createUser, UserController.createUser);
router.get('/:id', authMiddleware(), validate.getUser, UserController.getUser);
router.get('/', authMiddleware('manager'), UserController.getUsers);
router.patch(
  '/:id',
  authMiddleware('manager'),
  validate.updateUser,
  UserController.updateUser
);
router.delete(
  '/:id',
  authMiddleware('manager'),
  validate.deleteUser,
  UserController.deleteUser
);

router.post(
  '/authenticate',
  validate.authenticate,
  UserController.authenticate
);
router.post('/refresh-token', validate.token, UserController.refreshToken);
router.post('/revoke-token', validate.token, UserController.revokeToken);

module.exports = router;
