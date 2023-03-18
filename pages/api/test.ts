import { NextApiRequest, NextApiResponse } from "next";
import Database from "@/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get cookies from request
  const cookies = req.cookies;
  // query database from mongodb
  const data = await Database.checkConnect();
  // random number to set new cookie
  const rand = Math.floor(Math.random()* 10)
  // set new cookie on header with httponly
  res.setHeader(`Set-Cookie`, `name=${rand}; HttpOnly`)
  // response data & cookies
  res.status(200).json({ data, cookies });
}
