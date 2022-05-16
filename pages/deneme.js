import { Button, Input } from "@mui/material";
// import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../store";
import { setCounter } from "../store/slices/counterSlice";
import { controlSession } from "../utils";
import jsCookie from "js-cookie";
import Link from "next/link";

export default function Deneme({ sess }) {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user?.user);

	const emailOnChange = (e) => {
		setEmail(e.target.value);
	};

	if (user) {
		return (
			<div>
				<Head>
					<title>Deneme</title>
					<meta name="description" content="Deneme" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Layout background={false}>
					<h1 style={{ marginTop: "100px" }}>Protected Page</h1>
					<p>You can view this page because you are signed in.</p>
				</Layout>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>Deneme</title>
				<meta name="description" content="Deneme" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Input onChange={emailOnChange} placeholder="email" />
				<Link href="auth/signin">
					<Button>Login</Button>
				</Link>
				<p>You cant see that content, login to be able to see.</p>
			</Layout>
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res }) => {
			const sessionToken = req.cookies.sessionToken;
			const user = await controlSession(sessionToken, store);
			// console.log(req.cookies.counterValue);
			if (req.cookies.counterValue) {
				store.dispatch(setCounter(parseInt(req.cookies.counterValue)));
			}
			// console.log(store.getState().counter.count);
			return {
				props: {
					sess: user,
				},
			};
		}
);
