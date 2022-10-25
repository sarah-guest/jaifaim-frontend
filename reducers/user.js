import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, password: null, email: null, token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
  },
});
export const { signInUser } = userSlice.actions;
export default userSlice.reducer;
