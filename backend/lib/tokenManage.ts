import jwt from "jsonwebtoken";

class TokenManager {
  private static getJwtToken(): string {
    return process.env["JWT_TOKEN"] ?? "";
  }
  public static sign(payload: string | object) {
    const signedResult = jwt.sign(payload, this.getJwtToken(), {
      algorithm: "HS256",
      expiresIn: "30d",
    });
    return signedResult;
  }
  public static forLogin(params: {
    id: string;
    username: string;
    name: string;
    photo: string;
  }) {
    return this.sign(params);
  }
}

export default TokenManager;
