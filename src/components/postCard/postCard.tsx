import Image from "next/image"
import Link from "next/link"
import styles from "./postCard.module.css"

export default function PostCart({post}: {post: {
    img: string,
    createdAt?: Date,
    title:string,
    body:string,
    slug:string
}}) {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {post.img && <div className={styles.imgContainer}>
                <Image src={post.img} alt="" fill className={styles.img}/>
                </div>}
                <span className={styles.date}>{post.createdAt?.toString().slice(4, 16)}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
            </div>
        </div>
    );
}