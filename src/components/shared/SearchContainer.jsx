import { useState } from "react";

export default function SearchContainer() {
  const [weatherSearch, setWeatherSearch] = useState("");

  function handleWeatherSubmit(ev) {
    ev.preventDefault();
    console.log({ weatherSearch });
  }

  return (
    <form className="w-full flex justify-center" onSubmit={handleWeatherSubmit}>
      <input
        className="bg-gray-600 text-gray-400 px-5 py-3 rounded-lg outline-none w-full max-w-[500px]"
        value={weatherSearch}
        onChange={(ev) => setWeatherSearch(ev.target.value)}
        type="text"
        placeholder="Search location"
      />
    </form>
  );
}
