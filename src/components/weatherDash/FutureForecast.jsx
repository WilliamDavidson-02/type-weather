import React, { useContext, useEffect, useState } from "react";
import WeatherLocalTimeImg from "./WeatherLocalTimeImg";
import { SettingsContext } from "../context/SettingsContext";

export default function FutureForecast(props) {
  const { settings } = useContext(SettingsContext);
  const { weather, dayIndex } = props;
  const [dayName, setDayName] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    if (weather !== null) {
      const { date, day } = weather.forecast.forecastday[dayIndex];

      // uses the dates day as an index to select days array, - 1 since getDays() returns 1 to 7.
      setDayName(days[new Date(date).getDay() - 1]);

      setMaxTemp(
        settings.celsius
          ? `${Math.floor(day.maxtemp_c)}ºc`
          : `${Math.floor(day.maxtemp_f)}ºf`
      );
      setMinTemp(
        settings.celsius
          ? `${Math.floor(day.mintemp_c)}ºc`
          : `${Math.floor(day.mintemp_f)}ºf`
      );
    }
  }, [weather]);

  return (
    <div className="flex flex-col items-center">
      <span>{dayName}</span>
      <WeatherLocalTimeImg
        weather={weather}
        dayIndex={dayIndex}
        folder={"/icons"}
        imageStyling={"w-1/2 max-h-[200px] lg:max-h-[300px]"}
        fileFormat={"svg"}
      />
      <span>{maxTemp}</span>
      <span>{minTemp}</span>
    </div>
  );
}
