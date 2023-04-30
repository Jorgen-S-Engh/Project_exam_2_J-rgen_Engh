import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileRequest: (state) => {
      state.status = "loading";
    },
    profileSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    profileFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { profileRequest, profileSuccess, profileFailure } = profileSlice.actions;

export default profileSlice.reducer;
