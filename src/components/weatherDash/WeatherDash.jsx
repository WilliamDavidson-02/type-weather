import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoSm from "../shared/LogoSm";
import SearchContainer from "../shared/SearchContainer";
import WeatherBg from "./WeatherBg";

export default function WeatherDash() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=${city}`;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="w-full h-full p-3 md:p-5 flex flex-col lg:flex-row gap-3 md:gap-5">
      <div className="h-1/2 lg:h-full w-full lg:w-1/2 bg-gray-800 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex gap-3">
          <a className="p-4 bg-gray-600 rounded-lg" href="/">
            <LogoSm />
          </a>
          <SearchContainer />
        </div>
        <WeatherBg weather={weather} />
      </div>
      <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-3 md:gap-5">
        <div className="h-2/3 bg-gray-800 rounded-lg"></div>
        <div className="h-1/3 bg-gray-800 rounded-lg"></div>
      </div>
    </main>
  );
}
