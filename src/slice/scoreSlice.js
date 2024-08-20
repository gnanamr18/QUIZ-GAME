import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: localStorage.getItem("score")
    ? JSON.parse(localStorage.getItem("score"))
    : null,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setscore: (state, action) => {
      state.score = action.payload;
      localStorage.setItem("score", JSON.stringify(action.payload));
    },
  },
});

export const { setscore } = scoreSlice.actions;

export default scoreSlice.reducer;
