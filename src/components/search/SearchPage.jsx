import React from "react";
import LogoLg from "../shared/LogoLg";
import SearchContainer from "../shared/SearchContainer";

export default function SearchPage() {
  return (
    <main className="w-full h-full grid grid-rows-3">
      <LogoLg width={"w-1/2"} />
      <div className="w-[90%] mx-auto row-span-2 flex flex-col items-center gap-8">
        <div className="flex flex-col">
          <h1 className="m-0 text-gray-100 text-center text-xl md:text-3xl font-bold leading-7">
            Welcome to <span className="text-blue-light">TypeWeather</span>
          </h1>
          <p className="text-sm md:text-xl text-center leading-5">
            Choose a location to see the weather forecast
          </p>
        </div>
        <div className="max-w-[500px] w-full">
          <SearchContainer />
        </div>
      </div>
    </main>
  );
}
