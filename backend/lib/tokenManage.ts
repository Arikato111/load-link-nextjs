import jwt from "jsonwebtoken";

class TokenManager {
  private static getJwtToken(): string {
    return process.env["JWT_TOKEN"] ?? "";
  }

  /**
   * ### the function to verify the token and return the decoded data.
   * return false if the token is invalid or expired.
   */
  public static verify(token: string) {
    try {
      const decoded = jwt.verify(token, this.getJwtToken());
      return decoded;
    } catch (err) {
      return false;
    }
  }

  /**
   * ### the function to sign the payload and return the token.
   */
  public static sign(payload: string | object) {
    const signedResult = jwt.sign(payload, this.getJwtToken(), {
      algorithm: "HS256",
      expiresIn: "30d",
    });
    return signedResult;
  }

  /**
   * ### the function to create a token for login.
   */
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
