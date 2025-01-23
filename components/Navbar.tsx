import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const items: MenuProps["items"] = [
  {
    type: "group",
    label: (
      <Link href={"/"}>
        <span className="text-blue-500 text-2xl">LLN</span>
      </Link>
    ),
  },
  {
    label: <Link href={"/"}>รายการลิงก์</Link>,
    key: "",
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
    label: <Link href={"/register"}>สร้างบัญชี</Link>,
    key: "register",
  },
];

type NavbarProps = {
  isLogin: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isLogin }) => {
  const [current, setCurrent] = useState("about");
  const [navItem, setNavItem] = useState(items);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      let newNav = navItem.filter((v) => v?.key !== "login" && v?.key !== "register");
      newNav.push({
        key: "profile",
        label: <Link href={"/profile"}>โปรไฟล์</Link>,
      });
      setNavItem(newNav);
    }
    const route = router.pathname.split("/")[1];
    setCurrent(route ?? "link");
  }, [isLogin]);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={navItem}
    />
  );
};

export default Navbar;
