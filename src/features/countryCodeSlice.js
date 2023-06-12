import { createSlice } from "@reduxjs/toolkit";

const initialState = {name:"India",flag:"https://cdn.kcak11.com/CountryFlags/countries/in.svg",dialCode:"+91", isoCode: "IN",};

export const countryCodeSlice = createSlice({
  name: "countryCode",
  initialState,
  reducers: {
    setCountrySelected: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCountrySelected } = countryCodeSlice.actions;

export default countryCodeSlice.reducer;
