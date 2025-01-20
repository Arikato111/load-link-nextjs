import User from "./users";
import Token from "./token";
import prisma from "./prismaClient";

const Database = {
  Token,
  User,
  async close() {
    await prisma.$disconnect();
  },
};

export default Database;
