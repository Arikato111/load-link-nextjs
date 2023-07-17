import users from "./users";
import token from "./token";
import prisma from "./prismaClient";

const Database = {
  token,
  users,
  async close() {
    await prisma.$disconnect();
  },
};

export default Database;
