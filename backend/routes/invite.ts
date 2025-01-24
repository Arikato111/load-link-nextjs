import { Router } from "express";
import InviteController from "../controllers/InviteController";

const InviteRouter = Router();

InviteRouter.get("/inviter/:username", InviteController.getInviter);

InviteRouter.get("/invited/:username", InviteController.getInvited);

export default InviteRouter;
