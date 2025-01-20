import { Request, Response } from "express";
import Database from "@/backend/database/main";

class UserController {
  public static async index(req: Request, res: Response) {
    // get users from database
    const users = (await Database.User.getAll()) as any;
    await Database.close();
    // loop to hide sensitive data
    for (let i = 0; i < users.length; i++) {
      delete users[i].id;
      delete users[i].google_token;
    }
    res.json(users);
  }
}

export default UserController;
