import crypto from "crypto";
class Hasher {
  public static sha256sum(
    value: string,
    output: crypto.BinaryToTextEncoding = "hex"
  ): string {
    const result = crypto.createHash("sha256").update(value).digest(output);
    return result;
  }
}

export default Hasher;
