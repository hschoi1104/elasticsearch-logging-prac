import express from 'express';
var router = express.Router();
import guestBook from './guestBook.route';
import board from './board.route';
import arObject from './arObject.route';

router.use('/guestbook', guestBook);
router.use('/board', board);
router.use('/arobject', arObject);

module.exports = router;
