import { Typography } from "@mui/material";
import jsCookie from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { wrapper } from "../store";
import { decrement, increment, setCounter } from "../store/slices/counterSlice";
import styles from "../styles/fullheader.module.scss";
import { controlSession } from "../utils";

export default function Home({ sess, increase }) {
	const router = useRouter();
	const dispatch = useDispatch();
	// console.log(state);
	const [stateR, setStateR] = useState(0);
	const state = useSelector((state) => state.counter.count);
	useEffect(() => {
		setStateR(state);
	});
	useEffect(() => {
		// setStateR(state);
		if (state) {
			jsCookie.set("counterValue", state, { path: "/" });
		}
	}, [state]);

	return (
		<div>
			<Head>
				<title>Yalova Paragliding</title>
				<meta name="description" content="Yalova Paragliding" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout background={true}>
				{/* <div className="FullHeader"></div> */}
				<div className={`${styles.fullHeaderContainer} container-margin`}>
					<Typography className={`${styles.mainTitle}`}>
						SHADOWLANDS SEASON 3 IS NOW LIVE!
					</Typography>
					<Typography className={`${styles.fullHeaderText} ${styles.beigeFont}`}>
						The fight against the Jailer and his forces continues in this last chapter of
						the ongoing saga. Experience the all-new Sepulcher of the First Ones raid, a new
						PvP and Mythic Keystone Dungeon season, and more!
					</Typography>
					<button onClick={() => dispatch(increment())}>Increment</button>
					<button onClick={() => dispatch(decrement())}>Decrement</button>
					{stateR}
					{/* {typeof window !== undefined && <div> {state} </div>} */}
				</div>

				<Image
					layout="fill"
					src="https://parabuckk.s3.eu-central-1.amazonaws.com/G5Z8.gif"
					placeholder="blur"
					blurDataURL="https://parabuckk.s3.eu-central-1.amazonaws.com/image.png"
					className={styles.fullHeaderNext}
				></Image>
				<div style={{ height: "50vh" }}></div>
			</Layout>
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res }) => {
			const sessionToken = req.cookies.sessionToken;
			console.log(sessionToken);
			const user = await controlSession(sessionToken, store);

			if (req.cookies.counterValue !== 0) {
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
