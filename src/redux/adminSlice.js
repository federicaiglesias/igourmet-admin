import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logOut(state) {
      return {};
    },
  },
});

const { reducer, actions } = adminSlice;
export const { login, logOut } = actions;

export default reducer;
