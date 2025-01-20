import crypto from "crypto";
class Hasher {
  public static sha256sum(value: string): string {
    const result = crypto.createHash("sha256").update(value).digest("base64");
    return result;
  }
}

export default Hasher;
