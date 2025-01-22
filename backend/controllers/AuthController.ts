import { Request, Response } from "express";
import TokenManager from "../lib/tokenManage";
import Database from "@/backend/database/main";
import { HttpStatusCode } from "axios";
import Hasher from "../lib/hasher";

class AuthController {
  public static async example(req: Request, res: Response) {
    try {
      let token = TokenManager.sign({ username: "Hakata" });
      res.status(HttpStatusCode.Ok).json({
        token,
      });
    } catch (err) {
      res.status(HttpStatusCode.BadRequest).json({
        message: "Bad request",
      });
    }
  }
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      const { username, password } = req.body;

      if (!username || !password || !userAgent || !ip) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }

      let user = await Database.User.getByLogin(
        username,
        Hasher.sha256sum(password)
      );
      if (!user) {
        res.sendStatus(HttpStatusCode.Unauthorized);
        return;
      }

      const token = TokenManager.forLogin({
        id: user.id.toString(),
        username: user.username,
        name: user.name,
        photo: user.photo,
      });

      await Database.Token.createToken(token, user.id, ip, userAgent);
      Database.close();
      res.status(HttpStatusCode.Ok).json({
        token,
      });
      return;
    } catch (err) {
      res.sendStatus(HttpStatusCode.InternalServerError);
    }
  }

  public static async logout(req: Request, res: Response) {
    try {
      const user = req.user;
      await Database.Token.denyToken(user?.token ?? "");
      res.sendStatus(HttpStatusCode.Ok);
    } catch (err) {
      res.sendStatus(HttpStatusCode.InternalServerError);
    }
  }
}

export default AuthController;
