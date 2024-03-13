import { Suspense } from "react";
import Image from "next/image";
import styles from "./singlePost.module.css";
import { getPost } from "@/lib/data";
import PostUser from "@/components/postUser/postUser";

export const generateMetadata = async ({params}: { params: { slug: string } }) => {
    const post = await getPost(params.slug);

    return {
        title: post?.title,
        description: post?.desc,
    };
}

const getData = async (slug:string) => {
    let res = await fetch(`http://localhost:3000/api/blog/${slug}`);
    
    if(!res.ok){
        throw new Error("Something went wrong");
    }
    let posts = await res.json();

    return posts;
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
    // const post = await getPost(params.slug);
    const post = await getData(params.slug);

    return (
        <div className={styles.container}>
            {
                post?.img && <div className={styles.imgContainer}>
                    <Image src={post?.img} alt="" fill className={styles.img} />
                </div>
            }            
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <div className={styles.detail}>
                    {post && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId={post.userId} />
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>
                            {post?.createdAt?.toString().slice(4, 16)}
                        </span>
                    </div>
                </div>
                <div className={styles.content}>{post?.desc}</div>
            </div>
        </div>
    )
}