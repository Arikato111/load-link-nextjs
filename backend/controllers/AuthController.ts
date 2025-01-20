import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenManager from "../lib/tokenManage";
import Database from "@/backend/database/main";
import { StatusCodes } from "http-status-codes";
import { HttpStatusCode } from "axios";
import Hasher from "../lib/hasher";

class AuthController {
  public static async example(req: Request, res: Response) {
    try {
      // get token from env , if it's emty  it will throw error
      const access_token = process.env.REFRESH_TOKEN ?? "";
      // ceate token with jwt
      let token = jwt.sign({ playload: "data" }, access_token, {
        expiresIn: "1m",
      });
      res.json({
        statusCode: 201,
        data: {
          token,
        },
      });
    } catch (err) {
      // catch
      // when error will send error message
      res.status(200).json({
        statusCode: 100,
        msg: "Error request",
      });
    }
  }
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      // provide regisInfo
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      if (!userAgent || !ip) {
        res.status(StatusCodes.BAD_REQUEST);
        return;
      }

      // provide register info
      const { username, password, name, photo } = req.body;
      // check input error or emty
      if (!(name && photo && username && password)) {
        res.status(HttpStatusCode.BadRequest);
        return;
      }

      // if found user return 'already used'
      if (await Database.User.validateBeforeAdd(username)) {
        res.status(HttpStatusCode.Conflict).json({
          msg: "this user has alredy registerd",
        });
        return; // exit function
      }
      // create user
      await Database.User.add(
        username,
        Hasher.sha256sum(password),
        name,
        photo,
        ip,
        userAgent
      );

      // response data and token to client
      res.status(HttpStatusCode.Ok).json({ msg: "register success" });
    } catch (err) {
      // when get any error
      console.log(err);
      res.status(HttpStatusCode.BadRequest);
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      if (!userAgent || !ip) {
        res.status(StatusCodes.BAD_REQUEST);
        return;
      }

      const { username, password } = req.body;
      if (!username || !password) {
        res.status(HttpStatusCode.BadRequest);
        return;
      }

      let user = await Database.User.getByLogin(username, password);
      if (!user) {
        res.status(HttpStatusCode.Unauthorized);
        return;
      }

      const token = TokenManager.sign({
        id: user.id.toString(),
        username: user.username,
        name: user.name,
        photo: user.photo,
        userAgent,
        ip,
      });

      await Database.Token.createToken(token, user.id, ip, userAgent);
      Database.close();
      res.status(HttpStatusCode.Ok).json({
        token,
      });
      return;
    } catch (err) {
      res.status(HttpStatusCode.InternalServerError);
    }
  }
}

export default AuthController;
