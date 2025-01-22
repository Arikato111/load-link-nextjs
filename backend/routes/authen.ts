import express from "express";
import AuthController from "../controllers/AuthController";
const AuthRouter = express.Router();

// for example generate token
AuthRouter.get("/auth/example", AuthController.example);

// for login and create token
AuthRouter.post("/auth/login", AuthController.login);

export default AuthRouter;
