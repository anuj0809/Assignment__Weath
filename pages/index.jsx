import RainCard from "@/components/RainCard/RainCard";
import SearchBox from "@/components/SearchBox/SearchBox";
import SecondaryLoader from "@/components/SecondaryLoader/SecondaryLoader";
import WeatherBox from "@/components/WeatherCard/WeatherCard";
import WindCard from "@/components/WindCard/WindCard";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryLoader from "@/components/PrimaryLoader/PrimaryLoader";

const backgroundClasses = {
  d: "bg-gradient-to-b from-cyan-600 to-blue-950",
  n: "bg-gradient-to-b from-slate-900 to-blue-950",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [periodOfDay, setPeriodOfDay] = useState("d");
  const [weather, setWeather] = useState({});

  const updateWeather = (weather) => {
    setWeather({
      city: weather.city_name,
      country: weather.country_code,
      temperature: weather.temp,
      weatherIcon: weather.weather.icon,
      weatherDescription: weather.weather.description,
      longitude: weather.lon,
      latitude: weather.lat,
      windSpeed: weather.wind_spd,
      direction: weather.wind_cdir,
      humidity: weather.rh,
      precipitation: weather.precip,
      snow: weather.snow,
    });
    setPeriodOfDay(weather.pod);
  };
  const handleSearch = async (text) => {
    try {
      setIsLoading(true);
      setWeather({});
      const response = await axios
        .get(
          `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&city=${text}`
        )
        .then((response) => response.data);
      updateWeather(response.data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let longitude;
    let latitude;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        try {
          setIsLoading(true);
          const response = await axios
            .get(
              `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&lon=${longitude}&lat=${latitude}`
            )
            .then((response) => response.data);
          updateWeather(response.data[0]);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        console.log("unable to retrive geolocation");
      }
    );
  }, []);
  
  return (
    <main className={`min-h-screen ${backgroundClasses[periodOfDay]}`}>
      <div className="container mx-auto p-3 items-center">
        <div className="flex justify-center mb-4">
          <SearchBox handleSearch={handleSearch} />
        </div>
        {isLoading ? (
          <PrimaryLoader />
        ) : Object.keys(weather).length ? (
          <div className="flex flex-col items-center gap-4">
            <WeatherBox
              city={weather.city}
              country={weather.country}
              temperature={weather.temperature}
              weatherIcon={weather.weatherIcon}
              weatherDescription={weather.weatherDescription}
              longitude={weather.longitude}
              latitude={weather.latitude}
            />
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <WindCard
                windSpeed={weather.windSpeed}
                direction={weather.direction}
              />
              <RainCard
                humidity={weather.humidity}
                precipitation={weather.precipitation}
                snow={weather.snow}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="card w-64 bg-base-100 shadow-xl">
              <div className="w-100 flex justify-center">
                <SecondaryLoader />
              </div>
              <div className="card-body">
                <h2 className="card-title">Nothing Found! 👀</h2>
                <p>Try searching for your city</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
