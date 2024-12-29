import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import conf from "@/helpers/conf";
import connectDB from "@/db/connect";
import User, { enumProvider, UserSchema } from "@/models/user.models";
import bcrypt from "bcryptjs";

await connectDB();

const authOptions: NextAuthOptions = {
	providers: [
		Github({
			clientId: conf.githubClientID!,
			clientSecret: conf.githubSecret!,
		}),

		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials: any): Promise<any> {
				try {
					const email = credentials?.email;
					console.log("Email: ", email);
					const user = await User.findOne<UserSchema>({ email });

					if (!user) {
						throw new Error("user not found");
					}

					if (!user.isVerified) {
						throw new Error("user is must be verified before login");
					}

					const isValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isValid) {
						throw new Error("password is wrong");
					}

					return user;
				} catch (error: any) {
					console.log("authorize error: ", error.message);
					throw new Error(error.message);
				}
			},
		}),
	],
	pages: {
		signIn: "/signin",
		error: "/error",
	},
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.email = token.email;
				session.user.role = token.role;
				session.user.phoneNumber = token.phoneNumber;
			}

			return session;
		},

		async jwt({ token, user }) {
			if (user) {
				token._id = user._id;
				token.email = user.email;
				token.phoneNumber = user.phoneNumber;
				token.username = user.username;
				token.role = user.role;
			}

			console.log("token: ", token);
			return token;
		},

		async signIn({ account, profile }) {
			const email = profile?.email;

			const existingUser = await User.findOne<UserSchema>({ email });
			if (!existingUser && account?.provider.includes("github")) {
				await User.create<UserSchema>({
					username: profile?.name,
					email,
					role: "user",
					avatar: profile?.image,
					provider: enumProvider.GITHUB,
					isVerified: true,
				});
			}

			return true;
		},
	},
	session: {
		strategy: "jwt",
	},
};

export default authOptions;
