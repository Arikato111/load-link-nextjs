import { HttpStatusCode } from "axios";
import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Database from "../database/main";

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.headers["token"]?.toString() ?? "";
    if (!token || !(await Database.Token.check(token))) {
      res.sendStatus(HttpStatusCode.Unauthorized);
      return;
    }
    req.user = Jwt.decode(token) as UserValid;
    req.user.token = token;
    next();
  } catch (err) {
    res.sendStatus(HttpStatusCode.InternalServerError);
  }
}
