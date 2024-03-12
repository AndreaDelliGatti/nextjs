import { unstable_noStore as noStore } from "next/cache";
import { connectToDb } from "./connectToDb";
import { Post } from "@/model/post";
import { User } from "@/model/user";

export const getPosts = async () => {
    try {
        await connectToDb();
        const posts = await Post.find();
        return posts;
    }
    catch (e: any) {
        console.log(e);
        throw Error(e);
    }
}

export const getPost = async (slug: string) => {
    try {
        await connectToDb();
        const post = await Post.findOne({ slug });
        return post;
    }
    catch (e: any) {
        console.log(e);
        throw Error(e);
    }
}

export const getUsers = async () => {
    try {
        await connectToDb();
        const users = await User.find();
        return users;
    }
    catch (e: any) {
        console.log(e);
        throw Error(e);
    }
}

export const getUser = async (id: string) => {
    noStore();
    try {
        await connectToDb();
        const user = await User.findById(id);
        return user;
    }
    catch (e: any) {
        console.log(e);
        throw Error(e);
    }
}