import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export interface UserPublic {
  name: string;
  username: string;
  email: string;
  photo: string;
}

const UserProfileCard = ({ user }: { user: UserPublic }) => {
  return (
    <div className="flex">
      <img src={user.photo} alt="profile image" />
      <div className="p-3">
        <div>@{user.username}</div>
        <div>{user.name}</div>
        <div className="text-sm text-zinc-600">{user.email}</div>
      </div>
    </div>
  );
};

export default function Member() {
  const [users, setUsers] = useState<Array<UserPublic>>([]);

  async function fetchUsers() {
    try {
      let users = await axios.get("/api/users");
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
          <UserProfileCard key={idx} user={user} />
        ))}
      </main>
    </>
  );
}
