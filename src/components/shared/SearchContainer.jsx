import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchContainer() {
  const [weatherSearch, setWeatherSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const geoUrl = `https://api.geoapify.com/v1/geocode/autocomplete?format=json&type=city&lang=en&text=${weatherSearch}&apiKey=${
    import.meta.env.VITE_GEO_KEY
  }`;
  const navigate = useNavigate();

  function handleWeatherSubmit(ev) {
    ev.preventDefault();
    // Clearing weather search so the suggestions go away and input is cleared for next search, but the weatherSearch still needs to be sent in the path.
    const sendOfWeather = weatherSearch;
    setWeatherSearch("");
    navigate(`/weather/${sendOfWeather}`);
  }

  function handleSearchChange(ev) {
    setWeatherSearch(ev.target.value);
    if (weatherSearch.length >= 2) {
      axios
        .get(geoUrl)
        .then((response) => setSearchSuggestions([...response.data.results]))
        .catch((err) => console.log(err));
    }
  }

  return (
    <form
      className="relative w-full flex justify-center"
      onSubmit={handleWeatherSubmit}
    >
      <input
        autoFocus
        className=" bg-gray-600 text-gray-400 px-5 py-4 rounded-lg outline-none w-full"
        value={weatherSearch}
        onChange={handleSearchChange}
        type="text"
        placeholder="Search location"
      />
      {searchSuggestions.length > 0 && weatherSearch.length > 0 && (
        <div className="absolute w-full top-16 bg-gray-500 rounded-lg shadow-lg flex flex-col z-50">
          {searchSuggestions.map((suggestion) => (
            <button
              type="submit"
              onClick={() => setWeatherSearch(suggestion.address_line1)}
              className="cursor-pointer hover:bg-gray-400 transition duration-300 first:rounded-t-lg last:rounded-b-lg px-5 py-4 border border-transparent border-b-gray-900 text-gray-100 text-start outline-none"
              key={suggestion.place_id}
            >
              {suggestion.address_line1}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
