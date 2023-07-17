// api code is move to @/api
import express from "express";
import router from "@/backend/index";

const app = express();

app.use("/api/", router);

export default app;
