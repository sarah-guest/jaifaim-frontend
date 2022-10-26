import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, password: null, email: null, token: null, firstName: null },
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
   getFirstName:(state,action)=>{
    state.value.firstName=action.payload.firstName;
   },
});
export const { signInUser,GetFirstName } = userSlice.actions;
export default userSlice.reducer;
