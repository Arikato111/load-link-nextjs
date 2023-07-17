import express from "express";
import UserRouter from "./userRouter";
import AuthRouter from "./authRouter";

const router = express.Router();

router.use(UserRouter);
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
