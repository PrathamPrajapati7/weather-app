import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
import { saveLocation, updateSearchValue } from "../../features/search/searchSlice";

const API_KEY = "f7c196cd4851a81afcd3c4b3b94959d3";
const API_URL = "https://api.openweathermap.org/geo/1.0/direct";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const addToRecentSearches = (city) => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    const updated = [{ name: city.name, country: city.country, lat: city.lat, lon: city.lon }, ...stored.filter((s) => s.name !== city.name)];
    localStorage.setItem("recentSearches", JSON.stringify(updated.slice(0, 5)));
    window.dispatchEvent(new Event("storage"));
  };

  const handleInput = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const { data } = await axios.get(API_URL, {
          params: {
            q: e.target.value,
            limit: 5,
            appid: API_KEY,
          },
        });
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setSuggestions([]);
    dispatch(saveLocation(`${city.name}, ${city.country}`));
    dispatch(saveGeoCode({ lat: city.lat, lng: city.lon }));
    dispatch(updateSearchValue(""));
    addToRecentSearches(city);
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-2 h-6 w-6 text-gray-600 dark:text-gray-400" />
        <input
          type="text"
          className="w-full rounded-lg bg-neutral-50 py-2.5 pl-12 text-gray-900 dark:bg-neutral-800 dark:text-white outline-none"
          placeholder="Search city..."
          value={query}
          onChange={handleInput}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white dark:bg-neutral-900 shadow-lg rounded-lg overflow-y-auto max-h-40">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
              onClick={() => handleSelect(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
