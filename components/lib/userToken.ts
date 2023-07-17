import Cookies from "js-cookie";
import Jwt from "jsonwebtoken";
import { days, minutes } from "./aboutTime";

const userToken = {
  isLogined() {
    let cookiesStore = Cookies.get();
    if (!cookiesStore?.refreshToken) return false;

    let user_decoded = Jwt.decode(cookiesStore.refreshToken);
    console.log(user_decoded);
    return user_decoded;
  },
  saveToken(refresh_token: string, access_token: string) {
    Cookies.set("refreshToken", refresh_token, {
      path: "/",
      expires: new Date(Date.now() + days(30)),
    });
    Cookies.set("accessToken", access_token, {
      path: "/",
      expires: new Date(Date.now() + minutes(10)),
    });
  },
};

export default userToken;
