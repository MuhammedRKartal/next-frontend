import {
	ApolloClient,
	createHttpLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { Button, Container, Grid, TextField } from "@mui/material";
import jsCookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, VERIFY_LOGIN } from "../../graphql/Mutations";
import { setUser } from "../../store/slices/userSlice";
import styles from "../../styles/signin.module.scss";

export default function SignIn({}) {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_HTTP_URI,
	});

	const apolloClient = new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});

	// const loginCallbackGitHub = (e) => {
	// 	signIn("github");
	// };

	const loginCallbackCredentials = async (props) => {
		const httpLink = new HttpLink({
			uri: process.env.REACT_APP_HTTP_URI,
		});

		const apolloClient = new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache(),
		});
		let user;
		// console.log(props.code);
		await apolloClient
			.mutate({
				mutation: VERIFY_LOGIN,
				variables: { email: props.email, loginToken: props.code },
			})
			.then((data) => {
				return data.data.verifyLogin;
			})
			.then((response) => {
				user = response;
			})
			.catch((err) => {
				console.log(err);
			});
		if (user) {
			console.log("logged in");
			dispatch(setUser(user));
			console.log(user.sessionToken);
			jsCookie.set("sessionToken", user.sessionToken, { path: "/" });
			jsCookie.set("sessionExpiryDate", user.sessionExpiryDate, { path: "/" });
			router.replace("/");
			return user;
		} else {
			// console.log("fail");
			return null;
		}
	};

	const emailOnChange = (e) => {
		setEmail(e.target.value);
	};
	const codeOnChange = (e) => {
		setCode(e.target.value);
	};

	const loginSendCode = async () => {
		await apolloClient
			.mutate({
				mutation: LOGIN,
				variables: { email: email },
			})
			.then((data) => data && console.log("success"))
			.catch((error) => console.log(error));
	};

	return (
		<div className={styles.bgColor}>
			<Container className={styles.signContainer}>
				<div className={styles.boxWrapper}>
					<Grid container className={styles.boxWrapperInner}>
						<div className={styles.signLogo} />

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								size="small"
								onChange={emailOnChange}
								placeholder="email"
								className={styles.inputDiv}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button onClick={() => loginSendCode()} className={styles.loginButton}>
								Send Code
							</Button>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								size="small"
								onChange={codeOnChange}
								placeholder="code"
								className={styles.inputDiv}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								onClick={() => loginCallbackCredentials({ email: email, code: code })}
								className={styles.loginButton}
							>
								Login
							</Button>
							<Link href="/">
								<Button>Go Home</Button>
							</Link>
						</Grid>
						<div className={styles.othersDiv}>
							<div className={styles.othersLine}>Or log in with</div>
						</div>
						<Grid item xs={12}>
							{/* <IconButton
								onClick={() => loginCallbackGitHub()}
								className={styles.githubButton}
							>
								<GitHubIcon />
							</IconButton> */}
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	return {
		props: {
			// session: await getSession(context),
		},
	};
}
