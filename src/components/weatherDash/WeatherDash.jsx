import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function WeatherDash() {
  const { city } = useParams();
  const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=${city}`;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>WeatherDash</div>;
}
