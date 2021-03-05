import express from 'express';
var router = express.Router();
import validate from '../validate/guestBook.validate';
import { GuestBookController } from '../controller/guestBook.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createPost,
  GuestBookController.createPost
);
router.get('/', authMiddleware(), GuestBookController.getPosts);
router.delete(
  '/:_id',
  authMiddleware(),
  validate.getPosts,
  GuestBookController.deletePost
);

module.exports = router;
