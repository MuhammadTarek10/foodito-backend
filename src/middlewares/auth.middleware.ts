import jwt from "jsonwebtoken";
import { StatusCodes } from "../config/constants/status_codes";
import { ExpressHandler, JwtObject } from "../config/types/types";
import { db } from "../data/dao/datasource.dao";

export class AuthHelper {
  static jwtMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next();

    let payload: JwtObject;
    try {
      payload = this.verifyAuthToken(token);
    } catch (e) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: `Bad Token | ${e}` });
    }

    const user = await db.getUserById(payload.userId);
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "User not Found" });
    res.locals.userId = user.id;
    next();
  };

  static generateAuthToken(userId: string): string {
    const token = jwt.sign({ userId }, this.getJWTSecret());
    return token;
  }

  static verifyAuthToken(token: string): JwtObject {
    const decoded = jwt.verify(token, this.getJWTSecret()) as JwtObject;
    return decoded;
  }

  static getJWTSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      process.exit(1);
    }
    return secret;
  }
}
