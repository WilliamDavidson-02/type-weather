import React, { useContext, useEffect } from "react";
import LogoLg from "./LogoLg";
import ToggleBtn from "./ToggleBtn";
import { SettingsContext } from "../context/SettingsContext";

export default function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);

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
            initialToggle={settings.celsius}
          />
        </div>
        <div className="p-3 bg-gray-600 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Hour format: {settings.hour24 ? "24" : "12"}
          </h3>
          <ToggleBtn
            toToggle={Object.keys(settings)[1]}
            setToToggle={setSettings}
            initialToggle={settings.hour24}
          />
        </div>
        <div className="p-3 bg-gray-600 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Velocity format: {settings.kph ? "Kph" : "Mph"}
          </h3>
          <ToggleBtn
            toToggle={Object.keys(settings)[2]}
            setToToggle={setSettings}
            initialToggle={settings.kph}
          />
        </div>
      </div>
    </div>
  );
}
