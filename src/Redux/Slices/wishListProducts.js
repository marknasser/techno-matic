import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};
export const wishListProducts = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      const exit = state.wishList.find((el) => el.id == item.id);
      if (!exit) {
        state.wishList.push(...item);
      }
    },
    deleteFromWishList: (state, action) => {
      const itemId = action.payload;
      const exit = state.wishList.findIndex((el) => el.id == itemId);
      if (exit !== -1) {
        state.wishList.splice(exit, 1);
      }
      // state.wishList = state.wishList.filter((item) => item.id != itemId);
    },
  },
});

export const { addToWishList, deleteFromWishList } = wishListProducts.actions;
export default wishListProducts.reducer;
