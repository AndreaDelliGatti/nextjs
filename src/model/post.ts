import mongoose from "mongoose";
import { Model, Schema, model, SchemaTimestampsConfig } from "mongoose";

export type IPost = {
    title: string,
    desc: string,
    userId: string,
    slug: string,
    img?: string,
} & SchemaTimestampsConfig;

type PostModel = Model<IPost>;

const postSchema = new Schema<IPost, PostModel>({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {
    id: true,
    timestamps: true
});

export const Post: PostModel = mongoose.models?.Post || model<IPost, PostModel>("Post", postSchema);