import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 500,
    reward: 15,
  },
  reducers: {
    recharge: (state, action) => {
      state.value += action.payload;
    },
    balanceCut: (state, action) => {
      state.value -= action.payload;
    },
    rewardUp: (state, action) => {
      state.reward += action.payload;
    },

    rewardCut: (state, action) => {
      state.reward -= action.payload;
    },
  },
});

export const {
  recharge,
  balanceCut,
  rewardUp,
  rewardCut,
} = balanceSlice.actions;

export const selectBalance = (state) => state.balance.value;
export const selectReward = (state) => state.balance.reward;

export default balanceSlice.reducer;
