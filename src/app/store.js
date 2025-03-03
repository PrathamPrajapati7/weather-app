import { configureStore } from "@reduxjs/toolkit";
import geolocationSlice from "../features/geolocation/geolocationSlice";
import searchSlice from "../features/search/searchSlice";
import darkModeSlice from "../features/theme/themeSlice";
import { weatherApi } from "../services/WeatherApi.js";

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    geolocation: geolocationSlice.reducer,
    darkMode: darkModeSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
