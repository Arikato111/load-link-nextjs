import prisma from "./prismaClient";

const deleted = {
  OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
};

class User {
  public static async getAll() {
    let users = await prisma.users.findMany({
      where: { ...deleted },
    });
    return users;
  }

  public static async get_ById(id: string) {
    if (id.length !== 24) return null;
    let usr = await prisma.users.findFirst({
      where: { AND: { id: id, ...deleted } },
    });
    return usr;
  }

  public static async getByLogin(username: string, password: string) {
    const user = await prisma.users.findFirst({
      where: {
        AND: {
          username,
          password,
          ...deleted,
        },
      },
    });
    return user;
  }

  public static async getByUsername(username: string) {
    let user = await prisma.users.findFirst({
      where: { AND: { username: username, ...deleted } },
    });
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
        where: { AND: { name: { startsWith: uname }, ...deleted } },
      });
    } else {
      usr = await prisma.users.findFirst({
        where: { AND: { name: uname, ...deleted } },
      });
    }
    return usr;
  }

  public static async validateBeforeAdd(username: string) {
    let user = await prisma.users.findFirst({
      where: { username: username },
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

  public static async softDelete(id: string) {
    const user = await prisma.users.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
    return user;
  }

  public static async hardDelete(id: string) {
    await prisma.users.delete({ where: { id } });
    return 0;
  }
}

export default User;
