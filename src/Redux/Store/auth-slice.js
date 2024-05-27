import { createSlice } from "@reduxjs/toolkit";

const retrieveStoredToken = (name) => {
  const storedProperty = localStorage.getItem(name);
  if (storedProperty) return storedProperty;
  return null;
};

const initialState = {
  isLoggedIn: !!retrieveStoredToken("currentUser"),
  currentUser: JSON.parse(retrieveStoredToken("currentUser")),
  currentToken: retrieveStoredToken("currentToken"),
};

const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signup: (state, action) => {
      console.log("payload", action.payload);
      state.currentToken = action.payload.token;
      state.isLoggedIn = true;
      state.currentUser = action.payload.user;
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      localStorage.setItem("currentToken", action.payload.token);
    },

    logout: (state, action) => {
      state.currentToken = null;
      state.isLoggedIn = false;
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentToken");
    },
    updateUserGeneral: (state, action) => {
      state.currentUser = action.payload.updatedUser;
      localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload.updatedUser)
      );
    },
  },
});

export const { signup, logout, updateUserGeneral } = authReducer.actions;
export default authReducer.reducer;
