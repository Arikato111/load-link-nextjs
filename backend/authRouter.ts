import express from "express";
import jwt from "jsonwebtoken";
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

// for login and create token
AuthRouter.post("/auth/login", (req, res) => {
  res.json({ msg: "soon" });
});

// for generate access token with refresh token
AuthRouter.put("/auth/refresh", (req, res) => {
  res.json({ msg: "soon" });
});

export default AuthRouter;
