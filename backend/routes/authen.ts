import express from "express";
import AuthController from "../controllers/AuthController";
import { tokenValidation } from "../middleware/tokenMiddleware";
const AuthRouter = express.Router();

// for example generate token
AuthRouter.get("/auth/example", AuthController.example);

// for login and create token
AuthRouter.post("/auth/login", AuthController.login);

AuthRouter.delete("/auth/login", tokenValidation, AuthController.logout);

export default AuthRouter;
