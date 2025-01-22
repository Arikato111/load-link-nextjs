import Head from "next/head";
import { LogoutOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import userToken, { UserInterface } from "@/components/lib/userToken";
import { Button, Image, message } from "antd";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState<UserInterface>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let usr_tkn = userToken.isLogined();
    if (typeof usr_tkn !== "boolean" && usr_tkn) {
      setUser(usr_tkn);
    }
  }, []);

  const logoutActin = async () => {
    try {
      const token = userToken.getToken();
      if (token) {
        await axios.delete('/api/auth/login', {
          headers: {
            token
          }
        })
        userToken.deleteToken();
      }
      messageApi.open({
        type: "success",
        content: "logout succcess"
      })
      window.location.href = "/"
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Cannot logout please try again"
      })
    }
  }


  if (!user?.name) return <IfNotLogin />;
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>
      <main>
        {contextHolder}
        <Image src={user.photo} alt="profile image" />
        <div className="mx-3">
          <div>@{user.username}</div>
          <div>{user.name}</div>
        </div>
        <div>
          <Button color="danger" variant="solid" icon={<LogoutOutlined />}
            onClick={logoutActin}
          >Logout</Button>
        </div>
      </main>
    </>
  );
}

export default Profile;

function IfNotLogin() {
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>
      <main>
        <h3 className="text-center">คุณยังไม่ได้เข้าสู่ระบบ</h3>
      </main>
    </>
  );
}
