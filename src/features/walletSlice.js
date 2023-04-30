import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addWallet: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addWallet } = walletSlice.actions;
export default walletSlice.reducer;
