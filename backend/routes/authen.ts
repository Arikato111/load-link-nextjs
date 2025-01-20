import express from "express";
import AuthController from "../controllers/AuthController";
const AuthRouter = express.Router();

// for example generate token
AuthRouter.get("/auth/token-example", AuthController.example);

// register and generate token
AuthRouter.post("/auth/register", AuthController.register);

// for login and create token
AuthRouter.post("/auth/login", AuthController.login);

export default AuthRouter;
