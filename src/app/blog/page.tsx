import PostCart from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

export const metadata = {
    title: "Blog Page",
    description: "Blog description",
};

const getData = async () => {
    let res = await fetch("http://localhost:3000/api/blog");
    
    if(!res.ok){
        throw new Error("Something went wrong");
    }
    let posts = await res.json();

    return posts;
}

export default async function Blog() {
    // const posts = await getPosts();
    const posts = await getData();

    return (
        <div className={styles.container}>
            {
                posts.map((post: any, index:number) => (
                    <div className={styles.post} key={index}>
                        <PostCart post={post} key={index}/>
                    </div>
                ))
            }
        </div>
    )
}