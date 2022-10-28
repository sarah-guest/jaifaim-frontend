import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { username: null, password: null, email: null, token: null, name: null },
};

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        signInRestaurant: (state, action) => {
            //  state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.email = action.payload.email;
            state.value.password = action.payload.password;
        },

        getName: (state, action) => {
            state.value.name = action.payload.name;
        }
    }
});
export const { signInRestaurant, getName } = restaurantSlice.actions;
export default restaurantSlice.reducer;