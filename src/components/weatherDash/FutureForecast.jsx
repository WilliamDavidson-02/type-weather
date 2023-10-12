import React, { useContext, useEffect, useState } from "react";
import WeatherLocalTimeImg from "./WeatherLocalTimeImg";
import { SettingsContext } from "../context/SettingsContext";

export default function FutureForecast(props) {
  const { settings } = useContext(SettingsContext);
  const { weather, dayIndex } = props;
  const [dayName, setDayName] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

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

      setCondition(day.condition.text);
    }
  }, [weather]);

  return (
    <div className="flex flex-col items-center">
      <span className="font-bold lg:text-xl">
        {width < 1024 ? dayName.substring(0, 3) : dayName}
      </span>
      <WeatherLocalTimeImg
        weather={weather}
        dayIndex={dayIndex}
        folder={"/icons"}
        imageStyling={"w-1/2 lg:w-[200px] max-h-[200px] max-h-[300px]"}
        fileFormat={"svg"}
      />
      {width >= 1024 && (
        <span className="text-gray-200 text-lg">{condition}</span>
      )}
      <div className="flex flex-col lg:flex-row lg:gap-4 font-bold lg:text-lg">
        <span>{maxTemp}</span>
        <span className="text-gray-400">{minTemp}</span>
      </div>
    </div>
  );
}
