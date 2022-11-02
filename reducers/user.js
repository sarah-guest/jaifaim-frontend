import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, password: null, email: null, token: null, firstName: null, pref: null, diet: [], intolerances: [] },
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
      state.value.firstName = action.payload;
    },
    setProfilGourmand: (state, action) => {
      state.value.pref = action.payload;
    },
    getDiet: (state, action) => {
      state.value.diet.push(action.payload);
    },
    getIntolerances: (state, action) => {
      state.value.intolerances.push(action.payload);
    }
  }
});
export const { signInUser, signOutUser, getFirstName, setProfilGourmand, getDiet, getIntolerances } = userSlice.actions;
export default userSlice.reducer;
