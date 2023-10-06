import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./components/search/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
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
