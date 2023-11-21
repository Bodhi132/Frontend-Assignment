import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../FormSlice/slice"; 

const store = configureStore({
  reducer: {
    form:formReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;