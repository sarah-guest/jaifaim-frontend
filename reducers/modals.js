import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    showLikes: false,
    showBookmarks: false,
    showVisited: false,
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowBookmarks: (state, action) => {
      state.value.showBookmarks = action.payload;
    },
    setShowLikes: (state, action) => {
      state.value.showLikes = action.payload;
    },
    setShowVisited: (state, action) => {
      state.value.showVisited = action.payload;
    },
  },
});

export const { setShowBookmarks, setShowLikes, setShowVisited } =
  modalsSlice.actions;
export default modalsSlice.reducer;
