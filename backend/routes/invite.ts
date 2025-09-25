import { Router } from "express";
import InviteController from "../controllers/InviteController";
import { tokenValidation } from "../middleware/tokenMiddleware";

const InviteRouter = Router();

InviteRouter.get("/", tokenValidation, InviteController.getInviteCodes);

InviteRouter.get("/inviter/:username", InviteController.getInviter);

InviteRouter.get("/invited/:username", InviteController.getInvited);

export default InviteRouter;
