import { check, validationResult } from 'express-validator';
import { handleError } from '../model/Error';
import { logger } from '../config/winston';

exports.createPost = [
  check('name').isString().isLength({ min: 2 }),
  check('content').isString().isLength({ min: 2 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.getPosts = [
  check('_id').isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
