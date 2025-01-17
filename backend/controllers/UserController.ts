import { Request, Response } from "express";
import Database from "@/database/main";

export default {
  async get(req: Request, res: Response) {
    // get users from database
    const users = (await Database.users.getAll()) as any;
    await Database.close();
    // loop to hide sensitive data
    for (let i = 0; i < users.length; i++) {
      delete users[i].id;
      delete users[i].google_token;
    }
    res.json(users);
  },
};
