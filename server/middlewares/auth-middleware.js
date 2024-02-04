import ApiError from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";


export default function (req, res, next) {
  try {
    const authorizationHeaders = req.headers.authorization;

    if (!authorizationHeaders) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeaders.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}