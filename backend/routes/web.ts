import express from "express";
import UserRouter from "./user";
import AuthRouter from "./authen";
import testRouter from "./test";

const router = express.Router();

router.use("/test", testRouter);
// user
router.use("/user", UserRouter);
// authen
router.use(AuthRouter);

UserRouter.get("/", (req, res) => {
  res.json({
    status: 1,
    msg: "welcome to load-link-nextjs",
  });
});

// response error path
router.all("*", (req, res) => {
  res.json({
    statusCode: 0,
    msg: "bad request",
  });
});

export default router;
