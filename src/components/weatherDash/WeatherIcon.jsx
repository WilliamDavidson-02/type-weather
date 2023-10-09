import React, { useEffect, useState } from "react";
import { weatherCodes } from "../shared/WeatherCodes";
import { convertTime } from "../shared/TimeConverter";

export default function WeatherIcon(props) {
  const {
    clearWeatherCodes,
    fewCloudsWeatherCodes,
    cloudyWeatherCodes,
    rainyWeatherCodes,
    stormyWeatherCodes,
    snowyWeatherCodes,
  } = weatherCodes;
  const { weather } = props;
  const [weatherIcon, setWeatherIcon] = useState(null);

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
        weatherType = "Few clouds";
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

      console.log(`/icons/Weather=${weatherType}, Moment=Night.svg`);

      if (currentDate >= sunRiseDate && currentDate <= sunSetDate) {
        setWeatherIcon(
          <img
            className="w-1/2 max-h-[200px] lg:max-h-[300px]"
            src={`/icons/Weather=${weatherType}, Moment=Day.svg`}
            alt={weatherType}
          />
        );
      } else {
        setWeatherIcon(
          <img
            className="w-1/2 max-h-[200px] lg:max-h-[300px]"
            src={`/icons/Weather=${weatherType}, Moment=Night.svg`}
            alt={weatherType}
          />
        );
      }
    }
  }, [weather]);

  return <>{weatherIcon}</>;
}
