import prisma from "./prismaClient";

class User {
  public static async getAll() {
    let users = await prisma.users.findMany();
    return users;
  }

  public static async get_ById(id: string) {
    if (id.length !== 24) return null;
    let usr = await prisma.users.findFirst({ where: { id: id } });
    return usr;
  }

  public static async getByLogin(username: string, password: string) {
    const user = await prisma.users.findFirst({
      where: {
        username,
        password,
      },
    });
    return user;
  }

  public static async getByUsername(username: string) {
    let user = await prisma.users.findFirst({ where: { username: username } });
    if (user) return user;
    return false;
  }

  public static async getByName(
    uname: string,
    config?: { isStartWith?: boolean }
  ) {
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
  }

  public static async validateBeforeAdd(username: string) {
    let user = await prisma.users.findFirst({
      where: {
        OR: [{ username: username }],
      },
    });
    if (user) return user;
    return false;
  }

  public static async add(
    username: string,
    password: string,
    name: string,
    photo: string,
    ip: string,
    userAgent: string
  ) {
    let result = await prisma.users.create({
      data: {
        ip,
        userAgent,
        name,
        username,
        password,
        photo,
      },
    });
    return result;
  }
}

export default User;
