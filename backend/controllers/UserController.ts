import { Request, Response } from "express";
import Database from "@/backend/database/main";
import { HttpStatusCode } from "axios";
import Hasher from "../lib/hasher";

class UserController {
  /**
   * ### the function to get all users.
   * hide sensitive data before return.
   */
  public static async index(req: Request, res: Response) {
    try {
      // get users from database
      const users = (await Database.User.getAll()) as any;
      await Database.close();
      // loop to hide sensitive data
      for (let i = 0; i < users.length; i++) {
        delete users[i].id;
        delete users[i].password;
        delete users[i].createdAt;
        delete users[i].deletedAt;
        delete users[i].userAgent;
        delete users[i].ip;
      }
      res.json(users);
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCode.InternalServerError);
    }
  }

  /**
   * ### the function to register a new user.
   * check the invite code and username before register.
   */
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      const { username, password, name, photo, inviteCode } = req.body;
      // check empty data
      if (
        !ip ||
        !userAgent ||
        userAgent.length > 500 ||
        !new RegExp(/^[A-Za-z0-9_]+$/).test(username) ||
        !username ||
        username?.length > 200 ||
        !password ||
        !name ||
        name?.length > 200 ||
        !photo ||
        photo?.length > 500 ||
        !inviteCode
      )
        throw new Error("Bad request");
      // check invite code
      const checkInvite = await Database.Invite.checkValid(inviteCode);
      if (!checkInvite) {
        res.status(HttpStatusCode.Conflict).json({
          message: "this code has already used",
          reason: "code",
        });
        return;
      }
      // check username
      const checkUsername = await Database.User.validateBeforeAdd(username);
      if (checkUsername) {
        res.status(HttpStatusCode.Conflict).json({
          message: "Username has already used.",
          reason: "username",
        });
        return;
      }

      const user = await Database.User.add(
        username,
        Hasher.sha256sum(password),
        name,
        photo,
        ip,
        userAgent
      );
      await Database.Invite.setInvited(inviteCode, user.id.toString());

      // create 3 invite code
      await Database.Invite.create(user.id);

      await Database.close();
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(HttpStatusCode.BadRequest);
    }
  }
}

export default UserController;
