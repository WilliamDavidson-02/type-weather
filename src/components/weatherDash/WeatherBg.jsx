import { useEffect, useState } from "react";
import { weatherCodes } from "../shared/WeatherCodes";
import { convertTime } from "../shared/TimeConverter";

export default function WeatherBg(props) {
  const {
    clearWeatherCodes,
    fewCloudsWeatherCodes,
    cloudyWeatherCodes,
    rainyWeatherCodes,
    stormyWeatherCodes,
    snowyWeatherCodes,
  } = weatherCodes;
  const { weather } = props;
  const [weatherBg, setWeatherBg] = useState(null);

  useEffect(() => {
    if (weather !== null) {
      const sunRiseTime = convertTime(
        weather.forecast.forecastday[0].astro.sunrise
      );
      const sunSetTime = convertTime(
        weather.forecast.forecastday[0].astro.sunset
      );
      const currentTime = convertTime(
        new Date(weather.location.localtime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // https://www.weatherapi.com/docs/weather_conditions.json
      let weatherType = "";
      const { code } = weather.current.condition;

      if (clearWeatherCodes.includes(code)) {
        weatherType = "Clear";
      } else if (fewCloudsWeatherCodes.includes(code)) {
        weatherType = "Few Clouds";
      } else if (cloudyWeatherCodes.includes(code)) {
        weatherType = "Cloudy";
      } else if (rainyWeatherCodes.includes(code)) {
        weatherType = "Rain";
      } else if (stormyWeatherCodes.includes(code)) {
        weatherType = "Storm";
      } else if (snowyWeatherCodes.includes(code)) {
        weatherType = "Snow";
      } else {
        weatherType = "Clear";
      }

      const currentDate = new Date(
        2023,
        10,
        30,
        currentTime.hours,
        currentTime.minutes
      );
      const sunRiseDate = new Date(
        2023,
        10,
        30,
        sunRiseTime.hours,
        sunRiseTime.minutes
      );
      const sunSetDate = new Date(
        2023,
        10,
        30,
        sunSetTime.hours,
        sunSetTime.minutes
      );

      if (currentDate >= sunRiseDate && currentDate <= sunSetDate) {
        setWeatherBg(
          <img
            className="rounded-lg h-full w-full object-cover object-left"
            src={`/bg/Weather=${weatherType}, Moment=Day.jpg`}
            alt={weatherType}
          />
        );
      } else {
        setWeatherBg(
          <img
            className="rounded-lg h-full w-full object-cover object-left"
            src={`/bg/Weather=${weatherType}, Moment=Night.jpg`}
            alt={weatherType}
          />
        );
      }
    }
  }, [weather]);

  return <>{weatherBg}</>;
}
