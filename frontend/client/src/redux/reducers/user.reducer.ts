import { createSlice } from "@reduxjs/toolkit";

const initialState: { auth: boolean; user: User | null } = {
  auth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.auth = !!action.payload;
    },
    clearUser: () => {
      return { user: null, auth: false };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
