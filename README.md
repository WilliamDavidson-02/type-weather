# Type Weather

This is a small weather forecast project built with react, it uses [weather api](https://www.weatherapi.com/) to get the forecast of the day and the next two days as well. It also includes search suggestions using a [geoapify](https://www.geoapify.com/) which is displayed in a drop down menu.

The weather dash displays the current weather whit data like location, date, local time, temp, high and low and what type of weather condition. This is also complimented with a nice background that switches depending on the weather condition and if the local time to the location is during sun up hours or not e.g if it is raining in New York 03:00 at night it will display a rainy image at night, and same goes for the icon that displays weather condition.

### Installation

Clone the repo:

```bash
git clone https://github.com/WilliamDavidson-02/type-weather.git
```

run server

```bash
npm run dev
```

### Config

Add your own api keys in a new `.env` file from

- [weather api](https://www.weatherapi.com/)
- [geoapify](https://www.geoapify.com/)

like this

```bash
VITE_GEO_KEY= key from geoapify
VITE_WEATHER_KEY= key from weather api
```
