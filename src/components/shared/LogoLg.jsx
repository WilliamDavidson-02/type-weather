import React from "react";

export default function LogoLg(props) {
  const { width } = props;

  return (
    <img
      className={`${width} max-w-[170px]`}
      src="/public/weather-logo-lg.svg"
      alt="type-weather"
    />
  );
}
