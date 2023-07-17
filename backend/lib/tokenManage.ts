const TokenManages = {
  getAccessToken() {
    return process.env["ACCESS_TOKEN"] ?? "";
  },
  getRefreshToken() {
    return process.env["REFRESH_TOKEN"] ?? "";
  },
  getAll() {
    let accessTokenSeed = this.getAccessToken();
    let refreshTokenSeed = this.getRefreshToken();
    return {
      accessTokenSeed,
      refreshTokenSeed,
    };
  },
};

export default TokenManages;
