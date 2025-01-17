import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenManages from "../lib/tokenManage";
import Database from "@/database/main";
import ValidateEmail from "../lib/ValidateEmail";

export default {
  async example(req: Request, res: Response) {
    try {
      // get token from env , if it's emty  it will throw error
      const access_token = process.env.REFRESH_TOKEN ?? "";
      // ceate token with jwt
      let token = jwt.sign({ playload: "data" }, access_token, {
        algorithm: "HS256",
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
  },

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, photo, google_token } = req.body;
      // check input error or emty
      if (!(name && email && photo && google_token)) throw "Error bad reqest";
      // check user already use
      if (!ValidateEmail(email)) {
        throw "Error email format";
      }
      let username = email as string;
      username = username.split("@")[0];

      // if found user return 'already used'
      if (
        await Database.users.validateBeforeAdd(email, username, google_token)
      ) {
        res.json({
          statusCode: 202,
          msg: "this user has alredy registerd",
        });
        return; // exit function
      }

      // create user
      let user_created = await Database.users.add(
        name,
        username,
        email,
        google_token,
        photo
      );

      // create accessToken for client
      let accessToken = jwt.sign(user_created, TokenManages.getAccessToken(), {
        expiresIn: "15m",
      });
      // create refreshToken for client
      let refreshToken = jwt.sign(
        user_created,
        TokenManages.getRefreshToken(),
        {
          expiresIn: "30d",
        }
      );
      await Database.token.createToken(refreshToken, user_created.id);
      await Database.close();
      // response data and token to client
      res.json({
        statusCode: 201,
        data: {
          refreshToken,
          accessToken,
        },
        msg: "register success",
      });
    } catch (err) {
      // when get any error
      console.log(err);
      res.status(200).json({ statusCode: 200, msg: err });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { googleToken } = req.body;
      if (!googleToken) throw "error google token";
      let user = await Database.users.get_ByGoogleToken(googleToken);
      if (user) {
        let accessToken = jwt.sign(user, TokenManages.getAccessToken(), {
          expiresIn: "15m",
        });
        let refreshToken = jwt.sign(user, TokenManages.getRefreshToken(), {
          expiresIn: "30d",
        });
        await Database.token.createToken(refreshToken, user.id);
        Database.close();
        res.json({
          statusCode: 201,
          data: {
            refreshToken,
            accessToken,
          },
        });
        return; // exit function
      }
      // not found user
      res.json({
        statusCode: 202,
        msg: "you are not register",
      });
    } catch (err) {
      res
        .status(200)
        .json({ statusCode: 200, msg: "something error on server" });
    }
  },

  refresh(_: Request, res: Response) {
    res.json({ msg: "soon" });
  },
};
