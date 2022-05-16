import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const counterSlice = createSlice({
	name: "counter",
	initialState: {
		count: 0,
	},
	reducers: {
		increment: (state) => {
			state.count = state.count + 1;
		},
		decrement: (state) => {
			state.count = state.count - 1;
		},
		setCounter: (state, action) => {
			state.count = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			if (action.payload.counter.count === 0) {
				// console.log(state);
				return state;
			}
			state.count = action.payload.counter.count;
		},
	},
});

export const { increment, decrement, setCounter } = counterSlice.actions;

export default counterSlice.reducer;
