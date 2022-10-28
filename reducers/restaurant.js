import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { username: null, password: null, email: null, token: null, name: null,
             siren: null, webSite:null, telephone:null, publicEmail:null, streetNumber: null,
              streetType:null, streetName: null, postCode: null,city:null },
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
        },
        getInfoAdress:( state, action)=>{
            state.value.siren= action.payload.siren;
            state.value.webSite= action.payload.webSite;
            state.value.telephone= action.payload.telephone;
            state.value.publicEmail= action.payload.publicEmail;
            state.value.streetNumber= action.payload.streetNumber;
            state.value.streetType= action.payload.streetType;
            state.value.streetName= action.payload.streetName;
            state.value.postCode= action.payload.postCode;
            state.value.city= action.payload.city;



            

        }
    }
});
export const { signInRestaurant, getName, getInfoAdress } = restaurantSlice.actions;
export default restaurantSlice.reducer;