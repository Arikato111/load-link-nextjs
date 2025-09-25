import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import Database from "../database/main";
import TokenManager from "../lib/tokenManage";

class InviteController {
  public static async getInviteCodes(req: Request, res: Response) {
    try {
      let token = req.headers["token"];
      if (!token) throw new Error("not found token.");
      const user = TokenManager.verify(token as string);
      if (!user || typeof user === "string" || !user.id)
        throw new Error("not found user.");
      const inviteCodes = await Database.Invite.getInviteCodes(user.id);
      return res.status(HttpStatusCode.Ok).json(inviteCodes);
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCode.BadRequest);
    }
  }
  public static async getInvited(req: Request, res: Response) {
    try {
      const { username } = req.params;
      // If someone know how to check valid ObjectId in prisma
      // just add this to here.
      if (!username) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      const user = await Database.User.getByUsername(username);
      if (!user) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      const id = user.id.toString();
      const invite = await Database.Invite.getInviter(id);
      if (!invite) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      const inviter = await Database.User.get_ById(invite.inviter);
      if (!inviter) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      res.status(HttpStatusCode.Found).json({
        name: inviter.name,
        username: inviter.username,
        photo: inviter.photo,
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCode.BadRequest);
    }
  }

  public static async getInviter(req: Request, res: Response) {
    try {
      const { username } = req.params;
      // If someone know how to check valid ObjectId in prisma
      // just add this to here.
      if (!username) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      const user = await Database.User.getByUsername(username);
      if (!user) {
        res.sendStatus(HttpStatusCode.BadRequest);
        return;
      }
      const id = user.id.toString();
      const invite = await Database.Invite.getInvited(id);
      if (!invite) {
        res.status(HttpStatusCode.Found).json([]);
        return;
      }
      const userList: { id: string }[] = [];
      for (let i = 0; i < invite.length; i++) {
        if (!invite[i].invited) continue;
        userList.push({ id: invite[i].invited ?? "" });
      }
      const invitedList = await Database.User.getManyById(userList);
      if (!invitedList) {
        res.status(HttpStatusCode.Found).json([]);
        return;
      }
      const invitedListFilter: {}[] = [];
      invitedList.map((inv) => {
        invitedListFilter.push({
          name: inv.name,
          username: inv.username,
          photo: inv.photo,
        });
      });
      res.status(HttpStatusCode.Found).json(invitedListFilter);
      return;
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCode.BadRequest);
    }
  }
}

export default InviteController;
