import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../components/lib/firebase";
import GoogleButton from "@/components/GoogleButton";
import { Alert } from "antd";
import axios from "axios";
import userToken from "@/components/lib/userToken";

function NotLogin() {
  const [errorReport, setErrorReport] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setErrorReport("");
    }, 3000);
  }, [errorReport]);

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
      let response = await axios.post("/api/auth/register", userInfo);
      if (response.data.statusCode === 201) {
        console.log(response.data);
        userToken.saveToken(
          response.data.data.refreshToken,
          response.data.data.refreshToken
        );
      } else if (response.data.statusCode === 200) {
        setErrorReport("บัญนีนี้ได้ทำการลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ");
      }
    } catch (err) {
      console.error("Axios error");
      console.error(err);
    }
  };

  return (
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
      {!!errorReport && (
        <div className="max-w-md mx-auto my-3">
          <Alert type="error" message={errorReport} />
        </div>
      )}
    </div>
  );
}

function Logined() {
  return (
    <div>
      <div className="max-w-md mx-auto my-3">
        <Alert
          className="text-center text-slate-800"
          message={"คุณเข้าสู่ระบบแล้ว"}
        />
      </div>
    </div>
  );
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let loginState = userToken.isLogined();
    setIsLogin(!!loginState);
  }, []);
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>
      <div>
        <main className="container mx-auto py-auto">
          {isLogin ? <Logined /> : <NotLogin />}
        </main>
      </div>
    </>
  );
}
