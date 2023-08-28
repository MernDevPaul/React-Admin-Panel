import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/AuthSlice";


const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default Store;
