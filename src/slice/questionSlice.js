import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setquestions: (state, action) => {
      state.questions = action.payload;
      localStorage.setItem("questions", JSON.stringify(action.payload));
    },
  },
});

export const { setquestions } = questionsSlice.actions;

export default questionsSlice.reducer;
