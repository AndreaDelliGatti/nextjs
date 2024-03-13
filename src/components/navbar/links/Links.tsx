"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import { handleLogout } from "@/lib/action";
import { Session } from "next-auth";

export default function Links({session}: {session: any | null}) {
    const [open, setOpen] = useState(false);

    const links = [
        {
            title: "Home",
            path: "/"
        }, 
        {
            title: "About",
            path: "/about"
        }, 
        {
            title: "Contact",
            path: "/contact"
        }, 
        {
            title: "Blog",
            path: "/blog"
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {
                    links.map((link, index) => (
                    <NavLink item={link} key={index}/>
                    ))
                }
                {
                    session?.user ? (
                    <>
                        {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                        <form action={handleLogout}>
                        <button className={styles.logout}>Logout</button>
                        </form>
                    </>
                    ) : (
                    <NavLink item={{ title: "Login", path: "/login" }} />
                    )
                }
            </div>

            <Image
                className={styles.menuButton}
                src="/menu.png"
                alt=""
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />
            {
                open && (
                    <div className={styles.mobileLinks}>
                        {
                            links.map((link, index) => (
                            <NavLink item={link} key={index}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}