import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface UserPublic {
  name: string;
  username: string;
  photo: string;
}

const UserProfileCard = ({ user }: { user: UserPublic }) => {
  return (
    <div className="flex shadow my-3 p-3 rounded border border-solid border-gray-300">
      <img className="max-w-14 max-h-14" src={user.photo} alt="profile image" />
      <div className="p-3">
        <div>@{user.username}</div>
        <div>{user.name}</div>
      </div>
    </div>
  );
};

export default function Member() {
  const [users, setUsers] = useState<Array<UserPublic>>([]);

  async function fetchUsers() {
    try {
      let users = await axios.get("/api/user");
      console.log(JSON.stringify(users.data[0]));
      setUsers(users.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Head>
        <title>ผู้ใช้งานทั้งหมด</title>
      </Head>
      <main>
        {users.map((user, idx) => (
          <Link href={'./member/' + user.username} key={idx}>
            <UserProfileCard key={idx} user={user} />
          </Link>
        ))}
      </main>
    </>
  );
}
