import users from "./users";
import prisma from "./prismaClient";

const Database = {
  users,
  async close() {
    await prisma.$disconnect();
  },
};

export default Database;
