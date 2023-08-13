import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import userToken from "@/components/lib/userToken";

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let user = userToken.isLogined();
    console.log("check login on app", user);
    if (user) {
      setIsLogin(true);
    }
  }, []);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar isLogin={isLogin} />
        <Component {...pageProps} />
      </div>
    </>
  );
}
