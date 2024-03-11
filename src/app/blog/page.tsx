import PostCart from "@/components/postCard/postCard";
import styles from "./blog.module.css";

export default function Blog() {
    return (
        <div className={styles.container}>
            <div className={styles.post}>
                <PostCart post={{body: "hello", img: "/contact.png", slug: "test", title: "hello", createdAt: new Date()}}/>
            </div>
            <div className={styles.post}>
                <PostCart post={{body: "hello", img: "/contact.png", slug: "test", title: "hello", createdAt: new Date()}}/>
            </div>
            <div className={styles.post}>
                <PostCart post={{body: "hello", img: "/contact.png", slug: "test", title: "hello", createdAt: new Date()}}/>
            </div>
        </div>
    )
}