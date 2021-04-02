import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    storeItem: [],
  },
  reducers: {
    storeToBuy: (state, action) => {
      state.storeItem = action.payload;
    },
  },
});

export const { storeToBuy } = productSlice.actions;

export const selectStoreItem = (state) => state.product.storeToBuy;

export default productSlice.reducer;
