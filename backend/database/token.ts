import prisma from "./prismaClient";

const denyFilter = { deny: false };

class Token {
  public static async createToken(
    token: string,
    userId: string,
    ip: string,
    userAgent: string
  ) {
    let result = await prisma.token.create({
      data: {
        ip,
        userAgent,
        token,
        userId,
      },
    });
    return result;
  }

  public static async check(token: string) {
    const tokenResult = await prisma.token.findFirst({
      where: { AND: { token, ...denyFilter } },
    });
    return tokenResult;
  }

  public static async denyToken(token: string) {
    const tokenResult = await prisma.token.update({
      data: {
        deny: true,
      },
      where: { token },
    });
    return tokenResult;
  }
}

export default Token;
