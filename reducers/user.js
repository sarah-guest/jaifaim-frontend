import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, password: null, email: null, token: null, firstName: null, pref: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      // state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    signOutUser: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    getFirstName: (state, action) => {
      state.value.firstName = action.payload.firstName;
    },
    addUserInfo: (state, action) => {
      state.value.pref = action.payload.pref;
    }
  }
});
export const { signInUser, getFirstName, addUserInfo, signOutUser } = userSlice.actions;
export default userSlice.reducer;
