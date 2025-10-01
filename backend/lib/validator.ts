class Validator {
  /**
   * ### validate the email
   * and check if the email is not empty, less than 200 characters, and is a valid email format.
   *
   * @param email the email to validate
   * @returns boolean (true if valid, false if not valid)
   */
  public static email(email: string): boolean {
    return (
      !!email &&
      email.length <= 200 &&
      !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
  }
  /**
   * ### validate the username
   * and check if the username is not empty, less than 200 characters, and only contains letters, numbers, and underscores.
   *
   * @param username the username to validate
   * @returns boolean (true if valid, false if not valid)
   */
  public static username(username: string): boolean {
    return (
      !!username && username.length <= 200 && !!/^[A-Za-z0-9_]+$/.test(username)
    );
  }
}

export default Validator;
