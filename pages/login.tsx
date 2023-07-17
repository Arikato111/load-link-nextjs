import React from "react";
import Head from "next/head";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../components/lib/firebase";
import GoogleButton from "@/components/GoogleButton";
import axios from "axios";

export default function Login() {
  const onLoginClick = async () => {};

  const onRegisterClick = async () => {
    let auth = getAuth();
    let result = await signInWithPopup(auth, googleProvider);
    const userInfo = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
      google_token: result.user.uid,
    };
    try {
      let response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userInfo
      );
      console.log(response.data);
    } catch (err) {
      console.error("Axios error");
      console.error(err);
    }
  };
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>
      <div>
        <main className="container mx-auto py-auto">
          <div className="text-center">
            <span className="inline-block">
              <GoogleButton title="เข้าสู่ระบบ" onClick={onLoginClick} />
            </span>
            <span className="inline-block">
              <span className="flex justify-center items-center">หรือ</span>
            </span>
            <span className="inline-block">
              <GoogleButton title="ลงทะเบียน" onClick={onRegisterClick} />
            </span>
          </div>
        </main>
      </div>
    </>
  );
}
