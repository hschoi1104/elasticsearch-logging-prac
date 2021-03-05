import { check, validationResult } from 'express-validator';
import { handleError } from '../model/Error';
import { logger } from '../config/winston';

exports.createPost = [
  check('title').isString().isLength({ min: 2 }),
  check('content').isString().isLength({ min: 2 }),
  check('author').isString().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.getPost = [
  check('_id').isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.updatePost = [
  check('_id').isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.deletePost = [
  check('_id').isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
