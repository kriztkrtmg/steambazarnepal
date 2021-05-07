import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Project Demo",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/8/8c/Facebook_Home_logo_old.svg",
    //name: null,
    //photo: null,
  },
  reducers: {
    loginName: (state, action) => {
      state.name = action.payload;
    },
    loginPhoto: (state, action) => {
      state.photo = action.payload;
    },

    logoutName: (state, action) => {
      state.name = action.payload;
    },

    logoutPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const {
  loginName,
  loginPhoto,
  logoutName,
  logoutPhoto,
} = userSlice.actions;

export const selectUser = (state) => state.user.name;
export const selectPhoto = (state) => state.user.photo;

export default userSlice.reducer;
