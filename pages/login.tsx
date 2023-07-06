import React from "react";
import Head from "next/head";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../components/lib/firebase";
import GoogleButton from "@/components/GoogleButton";

export default function login() {
  const onLoginClick = async () => {};

  const onRegisterClick = async () => {
    let auth = getAuth();
    let result = await signInWithPopup(auth, googleProvider);
    console.log(result.user.metadata);
  };
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>
      <div>
        <main>
          <div className="sm:flex justify-around">
            <span className="inline-block">
              <GoogleButton title="เข้าสู่ระบบ Google" onClick={onLoginClick} />
            </span>
            <span className="inline-block">
              <GoogleButton
                title=" สมัครสมาชิกด้วย Google"
                onClick={onRegisterClick}
              />
            </span>
          </div>
        </main>
      </div>
    </>
  );
}
