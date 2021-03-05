import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class JWT {
  static generateAccessToken = async (user) => {
    return await jwt.sign(
      { id: user.id, auth: user.isManager, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
  };
}
