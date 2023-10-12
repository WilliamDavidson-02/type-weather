import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/shared/ErrorPage";
import Loading from "./components/shared/Loading";
import Settings from "./components/shared/Settings";
import { SettingsProvide } from "./components/context/SettingsContext";

const WeatherDash = lazy(() => import("./components/weatherDash/WeatherDash"));
const SearchPage = lazy(() => import("./components/search/SearchPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <SearchPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/weather/:city",
    element: (
      <Suspense fallback={<Loading />}>
        <WeatherDash />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: (
      <Suspense fallback={<Loading />}>
        <Settings />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen h-full max-w-screen text-white">
      <SettingsProvide>
        <RouterProvider router={router} />
      </SettingsProvide>
    </div>
  );
}

export default App;
