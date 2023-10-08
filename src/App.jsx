import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/shared/ErrorPage";
import Loading from "./components/shared/Loading";

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
    path: "/weather",
    element: (
      <Suspense fallback={<Loading />}>
        <WeatherDash />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
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
