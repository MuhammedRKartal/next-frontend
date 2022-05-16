// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
// import TwitterProvider from "next-auth/providers/twitter";
// import { VERIFY_LOGIN } from "../../../graphql/Mutations";

// export default NextAuth({
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: { label: "email", type: "text" },
// 				loginToken: { label: "loginToken", type: "text" },
// 			},

// 			async authorize(credentials, req) {
// 				const httpLink = new HttpLink({
// 					uri: process.env.REACT_APP_HTTP_URI,
// 				});

// 				const apolloClient = new ApolloClient({
// 					link: httpLink,
// 					cache: new InMemoryCache(),
// 				});
// 				let user;
// 				await apolloClient
// 					.mutate({
// 						mutation: VERIFY_LOGIN,
// 						variables: { email: credentials.email, loginToken: credentials.loginToken },
// 					})
// 					.then((data) => {
// 						return data.data.verifyLogin;
// 					})
// 					.then((response) => {
// 						user = response;
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 					});
// 				if (user) {
// 					return user;
// 				} else {
// 					return null;
// 				}
// 			},
// 		}),
// 		GitHubProvider({
// 			clientId: process.env.GITHUB_ID,
// 			clientSecret: process.env.GITHUB_SECRET,
// 		}),
// 		TwitterProvider({
// 			clientId: process.env.TWITTER_ID,
// 			clientSecret: process.env.TWITTER_SECRET,
// 			version: "2.0",
// 		}),
// 	],
// 	pages: {
// 		signIn: "/auth/signin",
// 		// email:""
// 	},
// 	session: {
// 		maxAge: 2 * 24 * 60 * 60,
// 		updateAge: 3 * 60 * 60,
// 		strategy: "jwt",
// 	},
// 	jwt: {
// 		verificationOptions: {
// 			algorithms: ["HS256", "HS512"],
// 		},
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// });
