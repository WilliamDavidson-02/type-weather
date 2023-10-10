import React, { useEffect, useState } from "react";

export default function ToggleBtn(props) {
  const { toToggle, setToToggle } = props;
  const initialToggle = JSON.parse(
    localStorage.getItem("type-weather-settings")
  )[toToggle];
  const [toggleBtn, setToggleBtn] = useState(initialToggle);

  function handleToggle() {
    setToggleBtn((prev) => !prev);
    setToToggle((prev) => ({ ...prev, [toToggle]: !prev[toToggle] }));
  }

  return (
    <div
      className={`${
        !toggleBtn ? "bg-blue-light" : "bg-gray-900"
      } transition duration-300 w-24 rounded-full p-1`}
    >
      <div
        onClick={handleToggle}
        className={`cursor-pointer w-6 h-6 rounded-full transition duration-300 ${
          !toggleBtn ? "translate-x-16 bg-gray-600" : "bg-gray-400"
        }`}
      ></div>
    </div>
  );
}
