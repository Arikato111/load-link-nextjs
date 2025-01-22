import prisma from "./prismaClient";

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
}

export default Token;
