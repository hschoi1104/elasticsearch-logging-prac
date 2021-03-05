import express from 'express';
var router = express.Router();
import validate from '../validate/board.validate';
import { BoardController } from '../controller/board.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createPost,
  BoardController.createPost
);
router.get(
  '/:_id',
  authMiddleware(),
  validate.getPost,
  BoardController.getPost
);
router.get('/', authMiddleware(), BoardController.getPosts);
router.patch(
  '/:_id',
  authMiddleware(),
  validate.updatePost,
  BoardController.updatePost
);
router.delete(
  '/:_id',
  authMiddleware(),
  validate.deletePost,
  BoardController.deletePost
);

module.exports = router;
