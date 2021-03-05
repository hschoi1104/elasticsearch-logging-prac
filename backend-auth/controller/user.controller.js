import { UserService } from '../service/user.service';
import { Response } from '../model/Response';
import { TokenCookie } from '../util/tokenCookie';
export class UserController {
  static createUser = async (req, res, next) => {
    try {
      const result = await UserService.createUser(req.body);

      return res
        .status(201)
        .json(new Response(201, 'success', 'create user success', result));
    } catch (err) {
      next(err);
    }
  };

  static getUser = async (req, res, next) => {
    try {
      const result = await UserService.getUser(req.params);

      return res
        .status(200)
        .json(new Response(200, 'success', 'find user success', result));
    } catch (err) {
      next(err);
    }
  };

  static getUsers = async (req, res, next) => {
    try {
      const result = await UserService.getUsers();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find users success', result));
    } catch (err) {
      next(err);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const result = await UserService.updateUser(req.params, req.body);

      return res
        .status(200)
        .json(new Response(200, 'success', 'update user success', result));
    } catch (err) {
      next(err);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const result = await UserService.deleteUser(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete user success', result));
    } catch (err) {
      next(err);
    }
  };

  static authenticate = async (req, res, next) => {
    try {
      const { result, refreshToken } = await UserService.authenticate(req.body);
      TokenCookie.setTokenCookie(res, refreshToken);
      return res
        .status(200)
        .json(new Response(200, 'success', 'Authenticate success', result));
    } catch (err) {
      next(err);
    }
  };

  static refreshToken = async (req, res, next) => {
    try {
      const { result, refreshToken } = await UserService.refreshToken(
        req.body,
        req.cookies
      );
      TokenCookie.setTokenCookie(res, refreshToken);
      return res
        .status(200)
        .json(
          new Response(200, 'success', 'Refresh Authenticate success', result)
        );
    } catch (err) {
      next(err);
    }
  };

  static revokeToken = async (req, res, next) => {
    try {
      await UserService.revokeToken(req.body, req.cookies);
      return res
        .status(200)
        .json(new Response(200, 'success', 'Revoke token sucess', 'revoked'));
    } catch (err) {
      next(err);
    }
  };
}
