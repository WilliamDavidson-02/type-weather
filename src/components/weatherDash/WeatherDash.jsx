import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoSm from "../shared/LogoSm";
import SearchContainer from "../shared/SearchContainer";
import TitleH3 from "./TitleH3";
import FullDateParagraph from "./FullDateParagraph";
import WeatherLocalTimeImg from "./WeatherLocalTimeImg";
import IconBtn from "../shared/IconBtn";
import SettingsIcon from "../shared/SettingsIcon";

export default function WeatherDash() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=${city}`;

  let localTimeInterval;

  useEffect(() => {
    if (!localStorage.getItem("type-weather-settings"))
      localStorage.setItem(
        JSON.stringify({ celsius: true, hour24: true, kph: true })
      );
  }, []);

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data);
        handleLocalTime(response.data.location.localtime.split(" ")[1]);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [city]);

  function handleLocalTime(time) {
    const secOffset = parseInt(
      new Date().toLocaleTimeString([], { second: "2-digit" }),
      10
    );

    const hour = time.split(":", 1);

    // Using local time minutes because the weather apis local time is not correct in minutes.
    let updateMinutes = parseInt(
      new Date().toLocaleTimeString([], { minute: "2-digit" }),
      10
    );
    updateMinutes = updateMinutes <= 9 ? `0${updateMinutes}` : updateMinutes;

    time = `${hour}:${updateMinutes}`;

    setLocalTime(time);

    clearInterval(localTimeInterval);

    localTimeInterval = setInterval(
      () => handleLocalTime(time),
      60000 - secOffset * 1000
    );
  }

  return (
    <main className="w-full h-full p-3 md:p-5 flex flex-col lg:flex-row gap-3 md:gap-5">
      <div className="lg:h-full w-full lg:w-1/2 bg-gray-800 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex gap-3 max-w-full">
          <IconBtn icon={<LogoSm />} href={"/"} />
          <SearchContainer />
          <IconBtn icon={<SettingsIcon />} href={"/settings"} />
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute top-0 w-full h-full p-5 md:p-10 flex flex-col justify-between">
            <div className="w-full flex justify-between">
              <div>
                <TitleH3 title={weather?.location.name} />
                <FullDateParagraph weather={weather} />
              </div>
              <TitleH3 title={localTime} />
            </div>
            <div className="w-full flex justify-between">
              <div className="w-1/2 flex flex-col justify-end">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[120%]">{`${Math.floor(
                  weather?.current.temp_c
                )}ºc`}</h1>
                <TitleH3
                  title={`${Math.floor(
                    weather?.forecast.forecastday[0].day.mintemp_c
                  )}ºc / ${Math.floor(
                    weather?.forecast.forecastday[0].day.maxtemp_c
                  )}ºc`}
                />
                <p className="md:text-lg lg:text-xl">
                  {weather?.current.condition.text}
                </p>
              </div>
              <WeatherLocalTimeImg
                weather={weather}
                folder={"/icons"}
                imageStyling={"w-1/2 max-h-[200px] lg:max-h-[300px]"}
                fileFormat={"svg"}
              />
            </div>
          </div>
          <WeatherLocalTimeImg
            weather={weather}
            folder={"/bg"}
            imageStyling={"rounded-lg h-full w-full object-cover object-left"}
            fileFormat={"jpg"}
          />
        </div>
      </div>
      <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-3 md:gap-5">
        <div className="h-2/3 bg-gray-800 rounded-lg"></div>
        <div className="h-1/3 bg-gray-800 rounded-lg"></div>
      </div>
    </main>
  );
}
