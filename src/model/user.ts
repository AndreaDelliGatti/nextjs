import mongoose from "mongoose";
import { Model, Schema, model, SchemaTimestampsConfig } from "mongoose";

export type IUser = {
    username: string,
    email: string
    isAdmin: boolean,
    password?: string,
    img?: string
} & SchemaTimestampsConfig

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        min: 8
    },
    img: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    id: true,
    timestamps: true
});

export const User: UserModel = mongoose.models?.User || model<IUser, UserModel>("User", userSchema);