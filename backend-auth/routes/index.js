import express from 'express';
import user from './user.route';
var router = express.Router();

router.use('/user', user);
module.exports = router;
