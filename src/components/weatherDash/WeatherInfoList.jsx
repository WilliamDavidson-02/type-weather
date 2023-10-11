import { useContext, useRef } from "react";
import { SettingsContext } from "../context/SettingsContext";

export function WeatherInfoList(props) {
  const { settings } = useContext(SettingsContext);
  const { weather, localTime } = props;
  const rainHour = useRef(0);

  if (weather !== null) {
    const { feelslike_c, feelslike_f, wind_kph, wind_mph, humidity, uv } =
      weather?.current;
    const { hour } = weather.forecast.forecastday[0];

    // Get the hour to select the index for chance_of_rain in api
    const [time, timeType] = localTime.split(" ");
    // Get the hour from string and make it an int.
    const hourIndex = parseInt(time.split(":", 1), 10);
    if (!timeType) {
      rainHour.current = hourIndex;
    } else {
      // convert 12 hour to 24 to use as index
      if (timeType === "AM" && hourIndex === 12) {
        rainHour.current = 0;
      } else if (timeType === "PM" && hourIndex < 12) {
        rainHour.current = hourIndex + 12;
      } else {
        rainHour.current = hourIndex;
      }
      console.log(rainHour.current);
    }

    return (
      <div>
        <div className="w-full border border-transparent border-b-gray-600 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <img src="/public/icons/temp.svg" alt="" />
            <span className="text-gray-200 font-bold">Thermal sensation</span>
          </div>
          <span className="text-gray-100 font-bold">
            {settings.celsius
              ? `${Math.floor(feelslike_c)}ºc`
              : `${Math.floor(feelslike_f)}ºf`}
          </span>
        </div>
        <div className="w-full border border-transparent border-b-gray-600 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <img src="/public/icons/rain.svg" alt="" />
            <span className="text-gray-200 font-bold">Probability of rain</span>
          </div>
          <span className="text-gray-100 font-bold">{`${
            hour[rainHour.current].chance_of_rain
          }%`}</span>
        </div>
        <div className="w-full border border-transparent border-b-gray-600 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <img src="/public/icons/wind.svg" alt="" />
            <span className="text-gray-200 font-bold">Wind speed</span>
          </div>
          <span className="text-gray-100 font-bold">
            {settings.kph
              ? `${Math.floor(wind_kph)} km/h`
              : `${Math.floor(wind_mph)} mph`}
          </span>
        </div>
        <div className="w-full border border-transparent border-b-gray-600 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <img src="/public/icons/humidity.svg" alt="" />
            <span className="text-gray-200 font-bold">Air humidity</span>
          </div>
          <span className="text-gray-100 font-bold">{`${humidity}%`}</span>
        </div>
        <div className="w-full py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <img src="/public/icons/uv.svg" alt="" />
            <span className="text-gray-200 font-bold">UV index </span>
          </div>
          <span className="text-gray-100 font-bold">{uv}</span>
        </div>
      </div>
    );
  }
}
