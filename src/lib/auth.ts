import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { connectToDb } from "./connectToDb";
import { User } from "@/model/user";
import z from "zod";

const credentialsSchema = z.object({
    username: z.string(),
    password: z.string()
}, {
    
})
type Credentials = z.infer<typeof credentialsSchema>;

const login = async (credentials: Credentials) => {
    try {
        await connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password!!
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        // console.log(err);
        throw new Error("Failed to login!");
    }
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    let res = credentialsSchema.safeParse(credentials);
                    if (res.success) {
                        const user = await login(res.data);
                        return user;
                    }
                } catch (err) {
                    // console.log(err);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "github") {
                await connectToDb();
                try {
                    const user = await User.findOne({ email: profile?.email });

                    if (!user) {
                        const newUser = new User({
                            username: profile?.login,
                            email: profile?.email,
                            img: profile?.avatar_url,
                        });

                        await newUser.save();
                    }
                } catch (err) {
                    // console.log(err);
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    },
});