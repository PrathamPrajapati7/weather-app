import { useEffect, useState } from "react";
import { MdDelete, MdHistory } from "react-icons/md";
import { useDispatch } from "react-redux";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
import { saveLocation } from "../../features/search/searchSlice";
import { fetchWeatherData } from "../../features/weather/weatherSlice"; // Import Weather Action

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSearches = () => {
      const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
      setRecentSearches(stored);
    };

    window.addEventListener("storage", loadSearches);
    loadSearches();

    return () => window.removeEventListener("storage", loadSearches);
  }, []);

  const handleSelect = (search) => {
    dispatch(saveLocation(`${search.name}, ${search.country}`));
    dispatch(saveGeoCode({ lat: search.lat, lng: search.lon }));
    dispatch(fetchWeatherData({ lat: search.lat, lon: search.lon })); // ✅ Automatically Fetch Weather
  };

  const deleteSearch = (index) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearAll = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-blue-500 dark:text-white">
          <MdHistory size={20} />
          <span className="font-semibold text-sm">Recent Searches</span>
        </div>
        {recentSearches.length > 0 && (
          <button className="text-red-500 text-sm" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <ul>
        {recentSearches.map((search, index) => (
          <li key={index} className="flex justify-between items-center py-2 fade-in">
            <span
              onClick={() => handleSelect(search)}
              className="cursor-pointer hover:text-blue-500 transition duration-300"
            >
              {search.name}, {search.country}
            </span>
            <MdDelete
              className="text-red-500 cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => deleteSearch(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearches;
