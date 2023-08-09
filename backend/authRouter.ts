import express from "express";
import jwt from "jsonwebtoken";
import TokenManages from "./lib/tokenManage";
import Database from "@/database/main";
const AuthRouter = express.Router();

// for example generate token
AuthRouter.get("/auth/token-example", (req, res) => {
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
});

// register and getnerate token
AuthRouter.post("/auth/register", async (req, res) => {
  try {
    const { name, email, photo, google_token } = req.body;
    // check input error or emty
    if (!(name && email && photo && google_token)) throw "Error bad reqest";
    // check user already use
    let user = await Database.users.get_ByGoogleToken(google_token);
    // if found user return 'already used'
    if (user)
      return res.json({
        statusCode: 202,
        msg: "this user has alredy registerd",
      });

    // create user
    let user_created = await Database.users.add(
      name,
      email,
      google_token,
      photo
    );

    // create accessToken for client
    let accessToken = jwt.sign(user_created, TokenManages.getAccessToken(), {
      expiresIn: "15m",
    });
    // create refreshToken for client
    let refreshToken = jwt.sign(user_created, TokenManages.getRefreshToken(), {
      expiresIn: "30d",
    });
    await Database.token.createToken(refreshToken, user_created.id);
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
    res.status(200).json({ statusCode: 200, msg: "error bad request" });
  }
});

// for login and create token
AuthRouter.post("/auth/login", (req, res) => {
  res.json({ msg: "soon" });
});

// for generate access token with refresh token
AuthRouter.put("/auth/refresh", (req, res) => {
  res.json({ msg: "soon" });
});

export default AuthRouter;
