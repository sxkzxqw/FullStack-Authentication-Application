import userService from "../service/user-service.js";
import ApiError from "../exceptions/api-error.js";
import { validationResult } from "express-validator";

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.register(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        // 30 дней
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        // 30 дней
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async sendMailAgain(req, res, next) {
    try {
      const { email } = req.user;
      await userService.sendActivationMailAgain(email);

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      const clientUrl = process.env.CLIENT_URL;

      return res.redirect(clientUrl + '/account');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        // 30 дней
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users)
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();