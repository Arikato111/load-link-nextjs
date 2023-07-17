import prisma from "./prismaClient";

const token = {
  async createToken(refresh_token: string, autherId: string) {
    let result = await prisma.token.create({
      data: {
        refresh_token: refresh_token,
        autherId: autherId,
      },
    });
    return result;
  },
};

export default token;
