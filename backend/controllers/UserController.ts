import { Request, Response } from "express";
import Database from "@/backend/database/main";
import { HttpStatusCode } from "axios";
import Hasher from "../lib/hasher";

class UserController {
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

  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      const { username, password, name, photo } = req.body;
      // check empty data
      if (!ip || !userAgent || !username || !password || !name || !photo)
        throw new Error("Bad request");
      // check username
      const checkUsername = await Database.User.validateBeforeAdd(username);
      if (checkUsername) {
        res.status(HttpStatusCode.Conflict).json({
          message: "Username has already used.",
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
