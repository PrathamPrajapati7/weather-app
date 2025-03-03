import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

import { useDispatch } from "react-redux";
import { saveLocation } from "../../features/search/searchSlice";
import City from "./City";

function OtherCities() {
  const dispatch = useDispatch();

  const cities = [
    {
      city: "Pune",
      country: "India",
      geolocation: { lat: "18.5204", lng: "73.8567" },
    },
    {
      city: "Mumbai",
      country: "India",
      geolocation: { lat: "19.0760", lng: "72.8777" },
    },
    {
      city: "Hyderabad",
      country: "India",
      geolocation: { lat: "17.3850", lng: "78.4867" },
    },
   
    {
      city: "Delhi",
      country: "India",
      geolocation: { lat: "28.7041", lng: "77.1025" },
    },
  ];
  

  const data = cities.map((city) => {
    const { data, isSuccess } = useGetCurrentWeatherQuery({
      lat: city.geolocation.lat,
      lng: city.geolocation.lng,
    });
    return { data, isSuccess };
  });

  const handleClick = (item) => {
    // Save geolocation to redux store
    dispatch(
      saveGeoCode({
        lat: item.data.coord.lat,
        lng: item.data.coord.lon,
      })
    );
    // save location to redux store
    dispatch(saveLocation(item.data.name, item.data.sys.country));

    // scroll to top of page
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">Other large cities</div>
      {data.map((item, i) => (
        <div key={i} onClick={() => handleClick(item)}>
          <City
            city={cities[i].city}
            country={cities[i].country}
            data={item.data}
          />
        </div>
      ))}
    </div>
  );
}

export default OtherCities;
