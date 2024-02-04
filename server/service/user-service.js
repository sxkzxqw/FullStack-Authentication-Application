import User from "../models/user-model.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
  async register(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`);
    }

    const hashPass = await bcrypt.hash(password, 6);
    const activationLink = uuidv4();

    const user = await User.create({ email, password: hashPass, activationLink: activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  async sendActivationMailAgain(email) {
    const user = await User.findOne({ email });
    const activationLink = user.activationLink;

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    return null;
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw new ApiError.BadRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с email ${email} не найден`);
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    const users = await User.find();

    return users;
  }
}

export default new UserService();