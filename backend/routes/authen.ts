import express from "express";
import jwt from "jsonwebtoken";
import TokenManages from "../lib/tokenManage";
import Database from "@/database/main";
import ValidateEmail from "../lib/ValidateEmail";
import AuthController from "../controllers/AuthController";
const AuthRouter = express.Router();

// for example generate token
AuthRouter.get("/auth/token-example", AuthController.example);

// register and generate token
AuthRouter.post("/auth/register", AuthController.register);

// for login and create token
AuthRouter.post("/auth/login", AuthController.login);

// for generate access token with refresh token
AuthRouter.put("/auth/refresh", AuthController.refresh);

export default AuthRouter;
