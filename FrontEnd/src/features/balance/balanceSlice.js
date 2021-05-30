import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 0,
    reward: 0,
  },
  reducers: {
    recharge: (state, action) => {
      let rewardString = action.payload.toFixed(); //34.34-string
      let rewardNumber = Number(rewardString); //34.34 - number
      state.value += rewardNumber;
    },
    balanceCut: (state, action) => {
      let rewardString = action.payload.toFixed(); //34.34-string
      let rewardNumber = Number(rewardString);
      state.value -= rewardNumber;
    },
    rewardUp: (state, action) => {
      let rewardString = action.payload.toFixed(); //34.34-string
      let rewardNumber = Number(rewardString);
      state.reward += rewardNumber;
    },

    rewardCut: (state, action) => {
      let rewardString = action.payload.toFixed();
      let rewardNumber = Number(rewardString);
      state.reward -= rewardNumber;
    },
  },
});

export const { recharge, balanceCut, rewardUp, rewardCut } =
  balanceSlice.actions;

export const selectBalance = (state) => state.balance.value;
export const selectReward = (state) => state.balance.reward;

export default balanceSlice.reducer;
