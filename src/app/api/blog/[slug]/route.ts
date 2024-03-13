import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/model/post";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (request: NextApiRequest, { params }: { params: { slug: string } }) => {
    try {
        const { slug } = params;
        await connectToDb();
        const post = await Post.findOne({ slug });
        return NextResponse.json(post);
    }
    catch (e) {
        throw new Error("failed to fetch post")
    }
}

export const DELETE = async (request: NextApiRequest, { params }: { params: { slug: string } }) => {
    try {
        const { slug } = params;
        await connectToDb();
        const post = await Post.deleteOne({ slug });
        return NextResponse.json({});
    }
    catch (e) {
        throw new Error("failed to delete post")
    }
}