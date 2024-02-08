import { dbConnect } from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

type Credential = {
    email: string;
    password: string;
}

async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        session: {
            strategy: 'jwt',
        },
        providers: [
            CredentialsProvider({
                // @ts-ignore
                async authorize(credentials: Credential) {
                    dbConnect();

                    const { email, password } = credentials;

                    const user = await User.findOne({ email }).select('+password');

                    if(!user) {
                        throw new Error('Invalid email or password!');
                    }

                    const isPasswordMatched = await bcrypt.compare(password, user.password);

                    if(!isPasswordMatched) {
                        throw new Error('Invalid email or password!');
                    }

                    return user;
                },
            }),
        ],

        callbacks: {
            jwt: async ({ token, user }) => {
                console.log(token);
                console.log(user);
                
                user && (token.user = user);

                return token;
            },

            session: async ({ session, token }) => {
                session.user = token.user as IUser;

                console.log(session);
                
                return session;
            },
        },

        secret: process.env.NEXTAUTH_SECRET
    });
};

export { auth as GET, auth as POST };