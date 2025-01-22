import User from "./users";
import Token from "./token";
import prisma from "./prismaClient";
import Invite from "./invite";

const Database = {
  Token,
  User,
  Invite,
  async close() {
    await prisma.$disconnect();
  },
};

export default Database;
