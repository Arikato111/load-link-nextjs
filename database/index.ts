import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get mongodb url connect from .env.local
const Database = {
  async createUser(
    name: string,
    email: string,
    google_token: string,
    photo: string
  ) {
    let result = await prisma.users.create({
      data: {
        name,
        email,
        google_token,
        photo,
      },
    });
    return result;
  },
  async getUsers_byId(id: string) {
    let result = await prisma.users.findFirst({ where: { id: id } });
    return result;
  },
  async close() {
    await prisma.$disconnect();
  },
};

export default Database;
