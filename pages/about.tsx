import React, { useEffect } from "react";
import Cookies from "js-cookie";

export default function About() {
  const showCookies = () => {
    const cookie = Cookies.get();
    console.log(cookie);
  };
  const getRemoveCookies = () => {
    Object.keys(Cookies.get()).map((index) => Cookies.remove(index));
  };
  useEffect(() => {
    showCookies();
  }, []);
  return (
    <div>
      <h1>About page</h1>
      <button
        className="bg-red-300 border-none rounded px-3 py-2 hover:bg-red-400 cursor-pointer"
        onClick={showCookies}
      >
        show cookie
      </button>
      <button onClick={getRemoveCookies}>remove cookie</button>
    </div>
  );
}
