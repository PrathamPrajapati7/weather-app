import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geolocation: { lat: 21.1458, lng: 79.0882 },
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    saveGeoCode: (state, action) => {
      return { ...state, geolocation: action.payload };
    },
  },
});

export const { saveGeoCode } = geolocationSlice.actions;
export default geolocationSlice;
