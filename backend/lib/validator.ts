class Validator {
  /**
   * ### validate the user agent from the request header.
   *
   * @param userAgent the user agent to validate
   * @returns boolean (true if valid, false if not valid)
   */
  public static userAgent(userAgent: string): boolean {
    // just check if the user agent is less than 200 characters
    return !!userAgent && /^.{0,200}$/.test(userAgent);
  }
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
      !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}){5,200}$/.test(email)
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
    return !!username && !!/^[A-Za-z0-9_]{3,200}$/.test(username);
  }

  /**
   * ### validate the photo url
   *
   * @param photo the photo url to validate
   * @returns boolean (true if valid, false if not valid)
   */
  public static photoUrl(photo: string): boolean {
    return (
      !!photo &&
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
        photo
      )
    );
  }

  public static fullName(name: string): boolean {
    return !!name && /^.[a-zA-Z\s]{0,200}$/.test(name);
  }
}

export default Validator;
