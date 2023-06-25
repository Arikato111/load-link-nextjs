import { NextApiRequest, NextApiResponse } from "next";
import Database from "@/database/main";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return PostMethod(req, res);
  } else {
    res.status(200).json({ statusCode: 0, msg: "error method" });
  }
}

const PostMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const usr = (await Database.users.getUser_ByName(
    req.body?.name ?? ""
  )) as any;
  delete usr?.id;
  delete usr?.google_token;
  await Database.close();
  res.json({ statusCode: 1, data: usr });
};
