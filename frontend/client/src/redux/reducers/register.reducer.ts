import { createSlice } from "@reduxjs/toolkit";

const initialState: { tab_index: number; user: User | null } = {
  tab_index: 0,
  user: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterState: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        tab_index: action.payload.tab_index,
      };
    },
    goBack: (state) => {
      return {
        ...state,
        tab_index: state.tab_index !== 0 ? state.tab_index - 1 : 0,
      };
    },
  },
});

export const { setRegisterState,goBack } = registerSlice.actions;
export default registerSlice.reducer;
