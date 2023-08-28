import { createSlice } from "@reduxjs/toolkit";
import state from "./States";
const setFetchingAndError = (state, isFetching, isError) => ({
  ...state,
  isFetching,
  error: isError,
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...state,
    isFetching: false,
    error: false,
  },
  reducers: {
    start: (state) => setFetchingAndError(state, true, false),
    success: (state, action) => ({
      ...setFetchingAndError(state, false, false),
      [action.payload.type]: action.payload.data,
    }),
    failure: (state) => setFetchingAndError(state, false, true),
  },
});

export const { start, success, failure } = authSlice.actions;
export default authSlice.reducer;
