import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loadImage: null,
    loadGameName: null,
    loadType: null,
    loadHeroName: null,
    loadRarity: null,
    loadGameIcon: null,
  },
  reducers: {
    loadImage: (state, action) => {
      state.loadImage = action.payload;
    },
    loadGameName: (state, action) => {
      state.loadGameName = action.payload;
    },
    loadGameIcon: (state, action) => {
      state.loadGameIcon = action.payload;
    },
    loadHeroName: (state, action) => {
      state.loadHeroName = action.payload;
    },
    loadType: (state, action) => {
      state.loadType = action.payload;
    },
    loadRarity: (state, action) => {
      state.loadRarity = action.payload;
    },
  },
});

export const {
  loadImage,
  loadType,
  loadRarity,
  loadHeroName,
  loadGameName,
  loadGameIcon,
} = productSlice.actions;

export const selectImage = (state) => state.product.loadImage;
export const selectType = (state) => state.product.loadType;
export const selectRarity = (state) => state.product.loadRarity;
export const selectHero = (state) => state.product.loadHeroName;
export const selectGame = (state) => state.product.loadGameName;
export const selectGameIcon = (state) => state.product.loadGameIcon;

export default productSlice.reducer;
