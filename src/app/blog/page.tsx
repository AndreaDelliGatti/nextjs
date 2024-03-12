import PostCart from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

export const metadata = {
    title: "Blog Page",
    description: "Blog description",
};

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className={styles.container}>
            {
                posts.map((post, index) => (
                    <div className={styles.post} key={index}>
                        <PostCart post={post} key={index}/>
                    </div>
                ))
            }
        </div>
    )
}