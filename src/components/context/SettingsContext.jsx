import { createContext, useEffect, useRef, useState } from "react";

export const SettingsContext = createContext({});

export function SettingsProvide({ children }) {
  const [settings, setSettings] = useState({
    celsius: true,
    hour24: true,
    kph: true,
  });
  const initialStorage = useRef(true);

  useEffect(() => {
    if (localStorage.getItem("type-weather-settings")) {
      setSettings(JSON.parse(localStorage.getItem("type-weather-settings")));
    } else {
      localStorage.setItem("type-weather-settings", JSON.stringify(settings));
    }
  }, []);

  useEffect(() => {
    if (initialStorage.current) {
      initialStorage.current = false;
    } else {
      localStorage.setItem("type-weather-settings", JSON.stringify(settings));
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
