import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    cartItem: [],
  },
  reducers: {
    itemInCart: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});

export const { itemInCart } = productSlice.actions;

export const selectCartItem = (state) => state.product.cartItem;

export default productSlice.reducer;
