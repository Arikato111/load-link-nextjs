import prisma from "./prismaClient";

const users = {
  async getAll() {
    let users = await prisma.users.findMany();
    return users;
  },

  async get_ByGoogleToken(google_token: string) {
    let user = await prisma.users.findFirst({
      where: { google_token: google_token },
    });
    return user;
  },
  async get_ById(id: string) {
    if (id.length !== 24) return null;
    let usr = await prisma.users.findFirst({ where: { id: id } });
    return usr;
  },
  async get_ByName(uname: string, config?: { isStartWith?: boolean }) {
    let usr;
    if (config?.isStartWith ?? true) {
      usr = await prisma.users.findFirst({
        where: { name: { startsWith: uname } },
      });
    } else {
      usr = await prisma.users.findFirst({
        where: { name: uname },
      });
    }
    return usr;
  },

  async add(
    name: string,
    username: string,
    email: string,
    google_token: string,
    photo: string
  ) {
    let result = await prisma.users.create({
      data: {
        name,
        username,
        email,
        google_token,
        photo,
      },
    });
    return result;
  },
};

export default users;
