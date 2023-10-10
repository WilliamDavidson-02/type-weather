import React, { useEffect, useState } from "react";
import LogoLg from "./LogoLg";
import ToggleBtn from "./ToggleBtn";

export default function Settings() {
  const [settings, setSettings] = useState({
    celsius: true,
    hour24: true,
    kph: true,
  });

  useEffect(() => {
    if (localStorage.getItem("type-weather-settings")) {
      setSettings(JSON.parse(localStorage.getItem("type-weather-settings")));
    } else {
      localStorage.setItem("type-weather-settings", JSON.stringify(settings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("type-weather-settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col gap-10 items-center">
      <LogoLg width={"w-1/2"} />
      <div className="w-full max-w-[900px] flex flex-col gap-4 p-4">
        <div className="p-3 bg-gray-600 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Temperature format: {settings.celsius ? "C" : "F"}
          </h3>
          <ToggleBtn
            toToggle={Object.keys(settings)[0]}
            setToToggle={setSettings}
          />
        </div>
        <div className="p-3 bg-gray-600 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Hour format: {settings.hour24 ? "24" : "12"}
          </h3>
          <ToggleBtn
            toToggle={Object.keys(settings)[1]}
            setToToggle={setSettings}
          />
        </div>
        <div className="p-3 bg-gray-600 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Velocity format: {settings.kph ? "Kph" : "Mph"}
          </h3>
          <ToggleBtn
            toToggle={Object.keys(settings)[2]}
            setToToggle={setSettings}
          />
        </div>
      </div>
    </div>
  );
}
