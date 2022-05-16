import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		signOut: (state) => {
			state.user = null;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			state.user = action.payload.user.user;
		},
	},
});

export const { setUser, signOut } = userSlice.actions;

export default userSlice.reducer;
