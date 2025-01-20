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
}

export default TokenManager;
