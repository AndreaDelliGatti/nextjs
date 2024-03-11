import Image from "next/image";
import styles from "./singlePost.module.css";

export default function SinglePost() {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="/contact.png" alt="" fill className={styles.img} />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.detail}>
                    {/* {post && (
                        <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={post.userId} />
                        </Suspense>
                    )} */}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>
                            Today
                        </span>
                    </div>
                </div>
                <div className={styles.content}>Here some description</div>
            </div>
        </div>
    )
}