import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      console.log("action.payload", user, token);
      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set("windex-access-token", token, { path: "/" });
    },

    logout: (state) => {
      console.log("logout222");
      // Remove token for cookies
      try {
        Cookies.remove("windex-access-token");
        removeFromSessionStorage("windex-access-token");
      } catch (err) {
        console.log("error", err);
      }

      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
