"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { connectToDb } from "./connectToDb";
import { Post } from "@/model/post";
import { User } from "@/model/user";

export const addPost = async (prevState: any, formData: FormData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        await connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        });

        await newPost.save();

        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (err) {
        // console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const deletePost = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await connectToDb();

        await Post.findByIdAndDelete(id);

        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (err) {
        // console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const addUser = async (prevState: any, formData: FormData) => {
    const { username, email, password, img, isAdmin } = Object.fromEntries(formData);

    try {
        await connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img,
            isAdmin
        });

        await newUser.save();

        revalidatePath("/admin");
    } catch (err) {
        // console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const deleteUser = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await connectToDb();

        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);

        revalidatePath("/admin");
    } catch (err) {
        // console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
};

export const handleLogout = async () => {
    "use server"
    await signOut();
};

export const register = async (prevState: any, formData: FormData) => {
    const { username, email, password, img, passwordRepeat } =
        Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return { success: false, error: "Passwords do not match" };
    }

    try {
        await connectToDb();

        const user = await User.findOne({ username });

        if (user) {
            return { success: false, error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();

        return { success: true };
    } catch (err) {
        // console.log(err);
        return { success: false, error: "Something went wrong!" };
    }
};

export const login = async (prevState: any, formData: FormData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (err: any) {
        // console.log(err.message);

        if (err.type && err.type == "CredentialsSignin") 
            return { error: "Invalid username or password" };
        
        throw err;
    }
};