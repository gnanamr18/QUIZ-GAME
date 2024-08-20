import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setcategory: (state, action) => {
      state.category = action.payload;
      localStorage.setItem("category", JSON.stringify(action.payload));
    },
  },
});

export const { setcategory } = categorySlice.actions;

export default categorySlice.reducer;
