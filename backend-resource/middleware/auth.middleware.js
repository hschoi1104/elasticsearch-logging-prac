import jwt from 'jsonwebtoken';
import { handleError } from './../model/Error';

function authMiddleware() {
  return [
    // authorize based on user role
    async (req, res, next) => {
      try {
        let token = req.headers.authorization.split('Bearer ')[1];
        try {
          await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          next(new handleError(401, 'Expired Token'));
        }
      } catch (err) {
        next(new handleError(401, 'Token is missing'));
      }
      next();
    },
  ];
}

module.exports = authMiddleware;
