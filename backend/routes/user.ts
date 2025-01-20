import express from "express";
import UserController from "../controllers/UserController";

const UserRouter = express.Router();

// for return users info
UserRouter.get("/", UserController.index);

export default UserRouter;
