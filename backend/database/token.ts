import prisma from "./prismaClient";

class Token {
  public static async createToken(
    token: string,
    autherId: string,
    ip: string,
    userAgent: string
  ) {
    let result = await prisma.token.create({
      data: {
        ip,
        userAgent,
        token,
        autherId,
      },
    });
    return result;
  }
}

export default Token;
