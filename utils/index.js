import styled from "styled-components";
import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { CONTROL_SESSION } from "../graphql/Mutations";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;

export const HeaderButton = styled.button`
	float: right;
	width: 25%;
	height: 100%;
	font-size: 25px;
`;

export const controlSession = async (sessionToken, store) => {
	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_HTTP_URI,
	});

	const apolloClient = new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});

	const user = await apolloClient
		.mutate({
			mutation: CONTROL_SESSION,
			variables: { sessionToken: sessionToken },
		})
		.then((data) => {
			// console.log("a", data);
			store.dispatch(setUser(data.data.controlSession));
			return data.data.controlSession;
		})
		.catch((err) => {
			// console.log(err);
			store.dispatch(setUser(null));
			return null;
		});
	// console.log("bb", user);
	return user;
};
