import { NextApiRequest, NextApiResponse } from "next";
import Database from "@/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await Database.getUsers_byId("6497c445e19e3030fa1398c8");
  await Database.close();
  res.json(users);
}
