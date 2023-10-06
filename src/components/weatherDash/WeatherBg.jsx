import React from "react";

export default function WeatherBg(props) {
  const { weatherType } = props;
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <img
      className="rounded-lg h-full object-cover object-left"
      src="/public/bg/Weather=Few Clouds, Moment=Night.jpg"
      alt=""
    />
  );
}
