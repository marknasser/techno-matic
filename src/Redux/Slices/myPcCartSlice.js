import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myPcCart: [],
};
export const myPcCart = createSlice({
  name: "myPcCart",
  initialState,
  reducers: {
    reset: (state) => {
      console.log(myPcCart);
      return {
        ...state,
        myPcCart: [],
      };
    },
    addProduct: (state, action) => {
      let dublicated = state.myPcCart.find(
        (product) => product.id == action.payload.id
      );

      if (!dublicated) {
        state.myPcCart.push(action.payload);
      } else {
        state.myPcCart.map((product) => {
          if (product.id === action.payload.id) {
            product.productQty.current++;
            product.totalPrice.current =
              product.priceAfterDisc * product.productQty.current;
          }
        });
      }
    },
    removeFromCart: (state, action) => {
      state.myPcCart = state.myPcCart.filter(
        (product) => product.title !== action.payload
      );
    },
  },
});

export const { addProduct, removeFromCart, reset } = myPcCart.actions;
export default myPcCart.reducer;
