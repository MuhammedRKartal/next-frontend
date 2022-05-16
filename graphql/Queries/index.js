import { gql } from "@apollo/client";

export const GET_USER = gql`
	query GetUser($id: String, $email: String, $phone: String) {
		getUser(id: $id, email: $email, phone: $phone) {
			name
			surname
			email
			phone
		}
	}
`;

export const GET_SINGLE_USER = gql`
	query GetSingleUser($id: String, $email: String, $phone: String) {
		getSingleUser(id: $id, email: $email, phone: $phone) {
			name
			surname
			email
			phone
		}
	}
`;

