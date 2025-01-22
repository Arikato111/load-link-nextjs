import express from "express";
import UserRouter from "./user";
import AuthRouter from "./authen";
import { HttpStatusCode } from "axios";

const router = express.Router();

// user
router.use("/user", UserRouter);
// authen
router.use(AuthRouter);

router.get("/", (req, res) => {
  res.json({
    message: "welcome to load-link-nextjs",
  });
});

// response error path
router.all("*", (req, res) => {
  res.status(HttpStatusCode.NotFound).json({
    message: "Not Found",
  });
});

export default router;
