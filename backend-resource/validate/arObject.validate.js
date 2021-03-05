import { check, validationResult } from 'express-validator';
import { handleError } from '../model/Error';
import { logger } from '../config/winston';

exports.createArObject = [
  // check('name').isString().isLength({ min: 2 }),
  // check('category').isString().isLength({ min: 2 }),
  // check('modifiedManager').isString().isLength({ min: 2 }),
  // check('content').isString().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.getArObject = [
  check('objectId').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.updateArObject = [
  check('objectId').isNumeric(),
  // check('name').isString().isLength({ min: 2 }),
  // check('category').isString().isLength({ min: 2 }),
  // check('modifiedManager').isString().isLength({ min: 2 }),
  // check('content').isString().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.deleteArObject = [
  check('objectId').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
