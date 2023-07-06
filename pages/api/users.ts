import { NextApiRequest, NextApiResponse } from "next";
import Database from "@/database/main";

// Exclude keys from user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // any type because I want to delete id and google token
  const users = (await Database.users.getAllUser()) as any;
  await Database.close();

  // hide id and google_token
  for (let i = 0; i < users.length; i++) {
    delete users[i].id;
    delete users[i].google_token;
  }

  res.json({ statusCode: 1, data: users });
}
