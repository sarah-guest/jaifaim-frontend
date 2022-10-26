import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { platdujourPhoto: null },
};

export const temporarySlice = createSlice({
  name: 'temporary',
  initialState,
  reducers: {
    setPlatdujourPhoto: (state, action) => {
      state.value.platdujourPhoto = action.payload;
    },
    clearPlatdujourPhoto: (state, action) => {
      state.value.platdujourPhoto = null;
    },
  },
});
export const { setPlatdujourPhoto, clearPlatdujourPhoto } =
  temporarySlice.actions;
export default temporarySlice.reducer;

// Un reducer pour stocker des données temporaires avant de les envoyer en DB !
// Initialement créé pour stocker la dernière photo du plat du jour avant de l'envoyer sur Cloudinary.
