
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button, Image } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface User {
    name: string;
    username: string;
    photo: string;
}

function Profile() {
    const router = useRouter();
    const { username } = router.query;
    const [user, setUser] = useState<User | null>();
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetchUser() {
        if (username === undefined) return;
        let users = await axios.get('/api/user/' + username);
        setUser(users.data);
        setIsLoaded(true);
    }
    useEffect(() => {
        fetchUser();
    }, [username]);


    if (!isLoaded) return <div>
        <h1>Loading...</h1>
    </div>;
    if (!user?.name) return <NotFoundUser />;
    return (
        <>
            <Head>
                <title>profile</title>
            </Head>
            <main className="text-center">
                <Image width={200} height={200} src={user.photo} alt="profile image" />
                <div className="mx-3">
                    <div>@{user.username}</div>
                    <div>{user.name}</div>
                </div>
                <div>
                    <Link href={`/member/${user.username}/links`}>
                        <Button type="primary">Links</Button>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default Profile;

function NotFoundUser() {
    return <div>Not found user</div>;
}