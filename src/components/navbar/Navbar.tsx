import styles from "./navbar.module.css";
import Links from "./links/Links";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>Logo</Link>
            <Links/>
        </div>
    )
}