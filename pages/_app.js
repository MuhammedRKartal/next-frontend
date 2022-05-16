import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useRouter } from "next/router";
import nprogress from "nprogress";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, wrapper } from "../store/index";
import "../styles/globals.scss";
import "../styles/nprogress.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const cache = createCache({
		key: "css",
		prepend: true,
	});

	if (typeof window !== "undefined") {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	const router = useRouter();

	useEffect(() => {
		const handleStart = (url) => {
			nprogress.start();
		};
		const handleStop = () => {
			nprogress.done();
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
		};
	}, [router]);

	const httpLink = new HttpLink({
		uri: process.env.FEEDREALBVADMIN,
	});

	const apolloClient = new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});

	return (
		// <SessionProvider session={session} refetchInterval={5 * 60}>
		<CacheProvider value={cache}>
			<ApolloProvider client={apolloClient}>
				{/* <PersistGate persistor={persistor}> */}
				<Component {...pageProps} />
				{/* </PersistGate> */}
			</ApolloProvider>
		</CacheProvider>
		// </SessionProvider>
	);
}

export default wrapper.withRedux(MyApp);
