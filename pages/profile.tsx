import Head from "next/head";
import React, { useEffect, useState } from "react";
import userToken, { UserInterface } from "@/components/lib/userToken";
import { useRouter } from "next/router";

function Profile() {
  const [user, setUser] = useState<UserInterface>();
  useEffect(() => {
    let usr_tkn = userToken.isLogined();
    if (typeof usr_tkn !== "boolean" && usr_tkn) {
      setUser(usr_tkn);
    }
  }, []);

  if (!user?.name) return <IfNotLogin />;
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>
      <main>
        <div className="flex">
          <img src={user.photo} alt="profile image" />
          <div className="mx-3">
            <div>@{user.username}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;

function IfNotLogin() {
  const { push } = useRouter();
  useEffect(() => {
    push("/login");
  }, []);
  return <></>;
}
