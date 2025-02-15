import Cookies from "js-cookie";
import Jwt from "jsonwebtoken";
import { days, minutes } from "./aboutTime";

// Generated by https://quicktype.io

export interface UserInterface {
  id: string;
  name: string;
  username: string;
  photo: string;
}

const userToken = {
  getToken() {
    let cookiesStore = Cookies.get();
    if (!cookiesStore?.token) return false;
    return cookiesStore.token;
  },
  isLogined(): boolean | UserInterface {
    let cookiesStore = Cookies.get();
    if (!cookiesStore?.token) return false;

    let user_decoded = Jwt.decode(cookiesStore.token);
    return user_decoded as UserInterface;
  },
  saveToken(token: string) {
    Cookies.set("token", token, {
      path: "/",
      expires: new Date(Date.now() + days(30)),
      sameSite: "strict",
    });
  },
  deleteToken() {
    Cookies.remove("token");
  },
};

export default userToken;
