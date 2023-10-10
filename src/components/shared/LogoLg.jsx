import React from "react";

export default function LogoLg(props) {
  const { width } = props;

  return (
    <div className="w-full flex justify-center items-start pt-12">
      <img
        className={`${width} max-w-[170px]`}
        src="/weather-logo-lg.svg"
        alt="type-weather"
      />
    </div>
  );
}
