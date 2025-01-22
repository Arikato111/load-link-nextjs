import { Prisma } from "@prisma/client";
import Hasher from "../lib/hasher";
import prisma from "./prismaClient";

class Invite {
  public static async create(userId: string) {
    const codes: Prisma.inviteCreateInput[] = [];
    for (let i = 0; i < 3; i++) {
      const code = Hasher.sha256sum(userId + i + new Date().toString() + i);
      codes.push({ code, inviter: userId });
      console.log(code);
    }
    await prisma.invite.createMany({
      data: codes,
    });
    return 0;
  }
}

export default Invite;
