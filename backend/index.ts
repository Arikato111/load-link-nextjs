import express from "express";
import Database from "@/database/main";

const router = express.Router();

router.get("/users", (req, res) => {
  res.status(200).json({
    statusCode: 1,
    msg: "Hello World",
  });
});

router.get("/users", async (req, res) => {
  const users = (await Database.users.getAllUser()) as any;
  await Database.close();
  for (let i = 0; i < users.length; i++) {
    delete users[i].id;
    delete users[i].google_token;
  }
  res.json(users);
});

router.all("*", (req, res) => {
  res.json({
    statusCode: 0,
    msg: "bad request",
  });
});

export default router;
