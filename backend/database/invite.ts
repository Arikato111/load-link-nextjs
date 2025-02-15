import { Prisma } from "@prisma/client";
import Hasher from "../lib/hasher";
import prisma from "./prismaClient";

const invitedFilter = {
  OR: [{ invited: null }, { invited: { isSet: false } }],
};
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

  // find who is inviter
  public static async getInviter(invitedId: string) {
    const inviter = await prisma.invite.findFirst({
      where: {
        invited: invitedId,
      },
    });
    return inviter;
  }

  public static async getInvited(inviterId: string) {
    const invited = await prisma.invite.findMany({
      where: {
        inviter: inviterId,
      },
      take: 3,
    });
    return invited;
  }

  public static async checkValid(code: string) {
    const invited = await prisma.invite.findFirst({
      where: {
        AND: {
          code,
          ...invitedFilter,
        },
      },
    });
    return invited;
  }

  public static async setInvited(code: string, invitedId: string) {
    const invited = await prisma.invite.update({
      data: {
        invited: invitedId,
      },
      where: {
        code,
      },
    });
    return invited;
  }
}

export default Invite;
