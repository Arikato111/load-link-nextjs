import { Prisma } from "@prisma/client";
import Hasher from "../lib/hasher";
import prisma from "./prismaClient";

const invitedFilter = {
  OR: [{ invited: null }, { invited: { isSet: false } }],
};
class Invite {
  /**
   * ### the function to create 3 invite codes for user.
   *
   * @param userId the id of the user who want to create invite code.
   * @returns 0 if success.
   */
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

  /**
   * ### the function to get all invite codes by user id.
   *
   * @param userId the id of the user who want to get invite codes.
   * @returns invite codes list.
   */
  public static async getInviteCodes(userId: string) {
    const codes = await prisma.invite.findMany({
      where: {
        inviter: userId,
      },
    });
    return codes;
  }

  /**
   * ### the function to get inviter info by invited user id.
   *
   * @param invitedId the id of the user who is invited.
   * @returns inviter info or null if not found.
   */
  public static async getInviter(invitedId: string) {
    const inviter = await prisma.invite.findFirst({
      where: {
        invited: invitedId,
      },
    });
    return inviter;
  }

  /**
   * ### the function to get invited info list by inviter user id.
   *
   * @param inviterId the id of the user who is the inviter.
   * @returns invited info list or empty list if not found.
   */
  public static async getInvited(inviterId: string) {
    const invited = await prisma.invite.findMany({
      where: {
        inviter: inviterId,
      },
      take: 3,
    });
    return invited;
  }

  /**
   * ### the function to check if the invite code is valid.
   *
   * @param code the invite code to check.
   * @returns invite info if valid, null if not valid.
   */
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

  /**
   *
   * @param code the invite code
   * @param invitedId the id of the user who is invited
   * @returns invite info after update
   */
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
