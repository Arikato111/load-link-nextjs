import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const items: MenuProps["items"] = [
  {
    label: <Link href={"/"}>รายการลิงก์</Link>,
    key: "link",
  },
  {
    label: <Link href={"/about"}>เกี่ยวกับ</Link>,
    key: "about",
  },
  {
    label: <Link href={"/member"}>ผู้ใช้งาน</Link>,
    key: "member",
  },
  {
    label: <Link href={"/login"}>เข้าสู่ระบบ</Link>,
    key: "login",
  },
  {
    label: <Link href={"/register"}>สมัครใช้งาน</Link>,
    key: "register",
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("about");
  const router = useRouter();
  useEffect(() => {
    const route = router.pathname.split("/")[1];
    setCurrent(route ?? "link");
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
