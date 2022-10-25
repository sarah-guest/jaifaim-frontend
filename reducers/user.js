import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { userame: null, password: null, email: null, token: null },
};
export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers: {
        getSignIn: (state,action)=>{
            state.value.token=action.payload.token;
            state.value.username=action.payload;
        },
    }
});
export const {getSignIn} = userSlice.actions;
export default userSlice.reducer