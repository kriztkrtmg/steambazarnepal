import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    /*name: "Kriztkrtmg",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/8/8c/Facebook_Home_logo_old.svg",
      */
    name: null,
    photo: null,
  },
  reducers: {
    loginName: (state, action) => {
      state.name = action.payload;
    },
    loginPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { loginName, loginPhoto } = userSlice.actions;

export const selectUser = (state) => state.user.name;
export const selectPhoto = (state) => state.user.photo;

export default userSlice.reducer;
