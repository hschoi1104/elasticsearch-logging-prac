import express from 'express';
var router = express.Router();
//import validate from '../validate/guestBook.validate';
import { ShortUrlController } from '../controller/guestBook.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post('/', authMiddleware(), ShortUrlController.createShortUrl);
router.get('/', authMiddleware(), ShortUrlController.getShortUrls);
router.get('/:key', authMiddleware(), ShortUrlController.getShortUrl);
router.delete('/:key', authMiddleware(), ShortUrlController.deleteShortUrl);

module.exports = router;
