import express from "express";
import UserController from "../controllers/UserController";
import { tokenValidation } from "../middleware/tokenMiddleware";

const UserRouter = express.Router();

// for return users info
UserRouter.get("/", UserController.index);
UserRouter.post("/", UserController.register);

export default UserRouter;
