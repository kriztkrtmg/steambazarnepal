import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Demo Project",
    photo:
      "https://icon-library.com/images/cool-profile-icon/cool-profile-icon-10.jpg",
    /* name: null,
    photo: null, */
    count: 0,
  },
  reducers: {
    loginName: (state, action) => {
      state.name = action.payload;
    },
    loginPhoto: (state, action) => {
      state.photo = action.payload;
    },
    notificationCount: (state) => {
      state.count += 1;
    },
    notificationReset: (state) => {
      state.count = 0;
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
  notificationCount,
  notificationReset,
} = userSlice.actions;

export const selectUser = (state) => state.user.name;
export const selectPhoto = (state) => state.user.photo;
export const selectNotification = (state) => state.user.count;

export default userSlice.reducer;
