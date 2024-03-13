import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/model/post";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (request: NextApiRequest) => {
    try {
        await connectToDb();
        const posts = await Post.find();
        return NextResponse.json(posts);
    }
    catch(e) {
        throw new Error("failed to fetch post")
    }
}