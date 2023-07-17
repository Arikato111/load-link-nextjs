// api code is move to @/api

import express from "express";
import router from "@/backend/index";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

const app = express();
app.use(express.json());

app.all("*", (req, res) => {
  res.json({ body: req.body });
});
// app.use("/api/", router);

export default app;
