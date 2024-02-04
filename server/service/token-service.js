import jwt from "jsonwebtoken";
import Token from "../models/token-model.js";

class TokenService {
  generateTokens(payload) {
    const accessKey = process.env.JWT_KEY_ACCESS;
    const refreshKey = process.env.JWT_KEY_REFRESH;

    const accessToken = jwt.sign(payload, accessKey, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });

    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const accessKey = process.env.JWT_KEY_ACCESS;

      const userData = jwt.verify(token, accessKey);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const refreshKey = process.env.JWT_KEY_REFRESH;

      const userData = jwt.verify(token, refreshKey);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }
}

export default new TokenService();