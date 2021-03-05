import { UserDao } from './../dao/user.dao';
import { RefreshTokenDao } from './../dao/refreshToken.dao';
import { handleError } from './../model/Error';
import { TokenResponse } from './../model/TokenResponse';
import crypto from 'crypto';
import { JWT } from './../util/jwt';
export class UserService {
  //User
  static createUser = async (req) => {
    let { id, password, name } = req;

    const salt = await crypto.randomBytes(64).toString('base64');
    password = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('base64');

    const existed = await UserDao.getUser(id);

    if (existed != null) {
      throw new handleError(409, 'User already existed');
    }

    try {
      const users = await UserDao.getUsers();
      const count = Object.keys(users).length;
      const isManager = count == 0 ? true : false;

      await UserDao.createUser(id, password, salt, name, isManager);
      const result = await UserDao.getUser(id);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create user fail');
    }
  };

  static getUser = async (req) => {
    const { id } = req;
    const result = await UserDao.getUser(id);

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    return result;
  };

  static getUsers = async () => {
    const result = await UserDao.getUsers();

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    return result;
  };

  static updateUser = async (params, body) => {
    const { id } = params;
    const { isManager } = body;
    const result = await UserDao.updateUser(id, isManager);

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    const findResult = await UserDao.getUser(id);
    return findResult;
  };

  static deleteUser = async (params) => {
    const { id } = params;

    const result = await UserDao.deleteUser(id);

    if (result.n == 0) {
      throw new handleError(404, 'User not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };

  //Auth
  static authenticate = async (body) => {
    const { id, password } = body;

    const user = await UserDao.getUserforAuth(id);

    if (user == null) {
      throw new handleError(404, 'User not exsited');
    }

    const salt = user.salt;
    const chkPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('base64');

    if (chkPassword != user.password) {
      throw new handleError(401, 'Auth Error');
    }

    const accessToken = await JWT.generateAccessToken(user);

    const refreshToken = await RefreshTokenDao.createRefreshToken(user);
    const result = new TokenResponse(user, accessToken);
    return { result: result, refreshToken: refreshToken.token };
  };

  static refreshToken = async (body, cookies) => {
    const token = body.refreshToken || cookies.refreshToken;
    const refreshToken = await RefreshTokenDao.getRefreshToken(token);
    if (refreshToken == null || refreshToken == 'Invalid token') {
      throw new handleError(404, 'Auth Error');
    }

    const { user } = refreshToken;

    const newRefreshToken = await RefreshTokenDao.createRefreshToken(user);

    await RefreshTokenDao.updateRefreshToken(
      refreshToken.token,
      Date.now(),
      newRefreshToken.token
    );

    const accessToken = await JWT.generateAccessToken(user);

    const result = new TokenResponse(user, accessToken);
    return { result: result, refreshToken: newRefreshToken.token };
  };

  static revokeToken = async (body, cookies) => {
    const token = body.refreshToken || cookies.refreshToken;

    const result = await RefreshTokenDao.updateRefreshToken(
      token,
      Date.now(),
      null
    );
    if (result == null) {
      throw new handleError(404, 'Revoke Error');
    }
  };
}
