import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    username: null,
    password: null,
    email: null,
    token: null,
    name: null,
    siren: null,
    website: null,
    phone: null,
    publicEmail: null,
    streetNumber: null,
    streetType: null,
    streetName: null,
    postCode: null,
    city: null,
    cuisine: [],
    atmosphere: [],
    bookings: null,
    miscellaneous: [],
    platdujour: null,
  },
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    signInRestaurant: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.name = action.payload.name;
    },
    getName: (state, action) => {
      state.value.name = action.payload.name;
    },
    getInfoAdress: (state, action) => {
      state.value.siren = action.payload.siren;
      state.value.website = action.payload.website;
      state.value.phone = action.payload.phone;
      //state.value.publicEmail = action.payload.publicEmail;
      state.value.streetNumber = action.payload.streetNumber;
      state.value.streetType = action.payload.streetType;
      state.value.streetName = action.payload.streetName;
      state.value.postCode = action.payload.postCode;
      state.value.city = action.payload.city;
    },
    getPrefRestauCuisine: (state, action) => {
      state.value.cuisine.push(action.payload);
    },
    getPrefRestauAtmos: (state, action) => {
      state.value.atmosphere.push(action.payload);
    },
    getPrefRestauBook: (state, action) => {
      state.value.bookings = action.payload;
    },
    getPrefRestauMisce: (state, action) => {
      state.value.miscellaneous.push(action.payload);
    },
    setPlatdujour: (state, action) => {
      state.value.platdujour = action.payload;
    },
  },
});
export const {
  signInRestaurant,
  getName,
  getInfoAdress,
  getPrefRestauCuisine,
  getPrefRestauAtmos,
  getPrefRestauBook,
  getPrefRestauMisce,
  setPlatdujour,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
