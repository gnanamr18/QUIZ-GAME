import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: localStorage.getItem("players")
    ? JSON.parse(localStorage.getItem("players"))
    : null,
};

const nameSlice = createSlice({
  name: "names",
  initialState,
  reducers: {
    setplayerName: (state, action) => {
      state.names = action.payload;
      localStorage.setItem("players", JSON.stringify(action.payload));
    },
  },
});

export const { setplayerName } = nameSlice.actions;

export default nameSlice.reducer;
