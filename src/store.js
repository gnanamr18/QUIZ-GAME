import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./slice/nameSlice";
import categoryReducer from "./slice/categorySlice";
import questionReducer from "./slice/questionSlice";
import scoreSliceReducer from "./slice/scoreSlice";

const store = configureStore({
  reducer: {
    names: nameReducer,
    category: categoryReducer,
    questions: questionReducer,
    score: scoreSliceReducer,
  },
});

export default store;
