import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./components/search/SearchPage";
import WeatherDash from "./components/weatherDash/WeatherDash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/weather/:city",
    element: <WeatherDash />,
  },
]);

function App() {
  return (
    <div className="bg-gray-900 h-screen w-screen text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
