import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const likedMealsSlice = createSlice({
    name: 'likedMeals',
    initialState,
    reducers: {
        likeMeal: (state, action) => {
            state.value.push(action.payload)
        },
        unLikeMeal: (state, action) => {
            state.value = state.value.filter(e => e.meal !== action.payload)
        },
    },
});
export const { likeMeal, unLikeMeal } = likedMealsSlice.actions;
export default likedMealsSlice.reducer;
