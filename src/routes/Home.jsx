import AirPollution from "../components/widgets/AirPollution";
import ChanceOfRain from "../components/widgets/ChanceOfRain";
import FeelsLike from "../components/widgets/FeelsLike";
import HourlyForecast from "../components/widgets/HourlyForecast";
import Humidity from "../components/widgets/Humidity";
import Precipitation from "../components/widgets/Precipitation";
import Pressure from "../components/widgets/Pressure";
import RecentSearches from "../components/widgets/RecentSearches";
import SunsetSunrise from "../components/widgets/SunsetSunrise";
import UVIndex from "../components/widgets/UVIndex";
import Visibility from "../components/widgets/Visibility";
import WeatherCard from "../components/widgets/WeatherCard";
import Wind from "../components/widgets/Wind";

function Home() {
  return (
    <>
      <main className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 sm:p-0 md:w-1/3">
            <WeatherCard />
            <HourlyForecast />
            <RecentSearches/>
          </div>
        
          <div className="mt-4 md:mt-0 md:w-2/3">
            <div className="grid grid-cols-2 justify-items-center gap-4 px-6 md:grid-cols-3 lg:grid-cols-4">
              <div className="col-span-2 w-full">
                <AirPollution />
                
              </div>
              <SunsetSunrise />
              <Wind />
              <UVIndex />
              <Precipitation />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
              <div className="col-span-2 w-full">
                <ChanceOfRain />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
