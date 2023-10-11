import { useContext } from "react";
import LogoLg from "./LogoLg";
import ToggleBtn from "./ToggleBtn";
import { SettingsContext } from "../context/SettingsContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  let navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col gap-10 items-center">
      <div className="w-full relative max-w-[900px]">
        <div
          onClick={() => navigate(-1)}
          className="absolute left-10 bottom-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <LogoLg width={"w-1/2"} />
      </div>
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
