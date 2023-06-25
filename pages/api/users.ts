import { NextApiRequest, NextApiResponse } from "next";
import Database from "@/database/main";

// Exclude keys from user
interface UsersAll {
  id?: string;
  name: string;
  email: string;
  photo: string;
  google_token?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = (await Database.users.getAllUser()) as UsersAll[];
  await Database.close();

  // hide id and google_token
  for (let i = 0; i < users.length; i++) {
    delete users[i].id;
    delete users[i].google_token;
  }

  res.json({ statusCode: 1, data: users });
}
