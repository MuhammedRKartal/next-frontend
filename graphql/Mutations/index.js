import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation AddUser(
		$name: String!
		$surname: String!
		$phone: String!
		$email: String!
	) {
		addUser(name: $name, surname: $surname, phone: $phone, email: $email) {
			name
			surname
			email
			phone
		}
	}
`;

export const CONTROL_SESSION = gql`
	mutation ControlSession($sessionToken: String!) {
		controlSession(sessionToken: $sessionToken) {
			email
			phone
			sessionToken
			sessionExpiryDate
			loginToken
			loginTokenExpiryDate
			surname
			name
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!) {
		login(email: $email) {
			name
			surname
			email
			phone
			sessionToken
			sessionExpiryDate
			loginToken
			loginTokenExpiryDate
		}
	}
`;

export const VERIFY_LOGIN = gql`
	mutation VerifyLogin($email: String!, $loginToken: String!) {
		verifyLogin(email: $email, loginToken: $loginToken) {
			name
			surname
			email
			phone
			sessionToken
			sessionExpiryDate
			loginToken
			loginTokenExpiryDate
		}
	}
`;
