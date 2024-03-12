import Image from "next/image";
import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";

export default async function PostUser({ userId }: {userId:string}) {
    const user = await getUser(userId);

    return (
        <div className={styles.container}>
        <Image
            className={styles.avatar}
            src={user?.img ? user.img : "/noavatar.png"}
            alt=""
            width={50}
            height={50}
        />
        <div className={styles.texts}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user?.username}</span>
        </div>
        </div>
    );
};