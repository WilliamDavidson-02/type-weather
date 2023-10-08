import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoSm from "../shared/LogoSm";
import SearchContainer from "../shared/SearchContainer";
import WeatherBg from "./WeatherBg";
import TitleH3 from "./TitleH3";
import FullDateParagraph from "./FullDateParagraph";

export default function WeatherDash() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=${city}`;

  let localTimeInterval;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data);
        handleLocalTime(response.data.location.localtime.split(" ")[1]);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLocalTime(time) {
    const [hour, minutes] = time.split(":");
    // Using local time minutes because the weather apis local time is not correct in minutes.
    let updateMinutes = parseInt(
      new Date().toLocaleTimeString([], { minute: "2-digit" }),
      10
    );
    let updateHour = parseInt(hour, 10);

    updateMinutes += localTime !== "" ? 1 : 0;

    if (updateMinutes >= 60) {
      updateHour = updateHour + 1 === 24 ? 0 : updateHour + 1;
      updateMinutes = 0;
    }

    const secOffset = parseInt(
      new Date().toLocaleTimeString([], { second: "2-digit" }),
      10
    );

    // Add to digit to one digit number + convert int to string
    updateMinutes = updateMinutes <= 9 ? `0${updateMinutes}` : updateMinutes;
    updateHour = updateHour <= 9 ? `0${updateHour}` : updateHour;

    time = `${updateHour}:${updateMinutes}`;

    setLocalTime(time);

    clearInterval(localTimeInterval);

    localTimeInterval = setInterval(
      () => handleLocalTime(time),
      60000 - secOffset * 1000
    );
  }

  return (
    <main className="w-full h-full p-3 md:p-5 flex flex-col lg:flex-row gap-3 md:gap-5">
      <div className="h-1/2 lg:h-full w-full lg:w-1/2 bg-gray-800 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex gap-3">
          <a className="p-4 bg-gray-600 rounded-lg" href="/">
            <LogoSm />
          </a>
          <SearchContainer />
        </div>
        <div className="relative h-full w-full">
          <div className="absolute top-0 w-full h-full p-5">
            <div className="h-full w-full flex justify-between">
              <div>
                <TitleH3 title={weather?.location.name} />
                <FullDateParagraph weather={weather} />
              </div>
              <TitleH3 title={localTime} />
            </div>
          </div>
          <WeatherBg weather={weather} />
        </div>
      </div>
      <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-3 md:gap-5">
        <div className="h-2/3 bg-gray-800 rounded-lg"></div>
        <div className="h-1/3 bg-gray-800 rounded-lg"></div>
      </div>
    </main>
  );
}
