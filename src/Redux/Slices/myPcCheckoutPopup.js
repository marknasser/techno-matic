import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};
export const myPcCheckoutPopup = createSlice({
  name: "open",
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = myPcCheckoutPopup.actions;
export default myPcCheckoutPopup.reducer;
