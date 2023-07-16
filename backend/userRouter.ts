import express from "express";
import Database from "@/database/main";

const UserRouter = express.Router();

// for return users info
UserRouter.get("/users", async (req, res) => {
  // get users from database
  const users = (await Database.users.getAllUser()) as any;
  await Database.close();
  // loop to hide sensitive data
  for (let i = 0; i < users.length; i++) {
    delete users[i].id;
    delete users[i].google_token;
  }
  res.json(users);
});

export default UserRouter;
