import { useEffect, useState } from "react";

export default function WeatherLocalTimeImg(props) {
  const clearWeatherCodes = [1000];
  const fewCloudsWeatherCodes = [1003];
  const cloudyWeatherCodes = [1006, 1009, 1030, 1135, 1147];
  const rainyWeatherCodes = [
    1063, 1150, 1153, 1168, 1180, 1183, 1186, 1189, 1198, 1240, 1243, 1246,
    1276,
  ];
  const stormyWeatherCodes = [1087, 1171, 1192, 1195, 1201, 1207, 1273];
  const snowyWeatherCodes = [
    1066, 1069, 1072, 1114, 1117, 1204, 1210, 1213, 1216, 1219, 1222, 1225,
    1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282,
  ];

  const { weather, dayIndex, imageStyling, folder, fileFormat } = props;
  const [weatherImage, setWeatherImage] = useState(null);

  function convertTime(timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    let hours24 = parseInt(hours, 10);

    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    return { hours: hours24, minutes: parseInt(minutes, 10) };
  }

  useEffect(() => {
    if (weather !== null) {
      const sunRiseTime = convertTime(
        weather.forecast.forecastday[dayIndex].astro.sunrise
      );
      const sunSetTime = convertTime(
        weather.forecast.forecastday[dayIndex].astro.sunset
      );
      const currentTime = convertTime(
        new Date(weather.location.localtime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // https://www.weatherapi.com/docs/weather_conditions.json
      let weatherType = "";
      const { code } =
        weather.forecast.forecastday[dayIndex].hour[currentTime.hours]
          .condition;

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

      if (currentDate >= sunRiseDate && currentDate <= sunSetDate) {
        setWeatherImage(
          <img
            className={imageStyling}
            src={`${folder}/Weather=${weatherType}, Moment=Day.${fileFormat}`}
            alt={weatherType}
          />
        );
      } else {
        setWeatherImage(
          <img
            className={imageStyling}
            src={`${folder}/Weather=${weatherType}, Moment=Night.${fileFormat}`}
            alt={weatherType}
          />
        );
      }
    }
  }, [weather]);

  return <>{weatherImage}</>;
}
