import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  );
};

const CountryList = ({
  filtered,
  handleButton,
  currentCountry,
  displayCountry,
  api_key,
  setWeatherData,
  weatherData,
}) => {
  return (
    <div>
      {filtered.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={handleButton(country)}>show</button>
        </div>
      ))}
      {displayCountry ? (
        <Country
          setWeatherData={setWeatherData}
          api_key={api_key}
          country={currentCountry}
          weatherData={weatherData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const Results = ({
  data,
  search,
  currentCountry,
  handleButton,
  displayCountry,
  api_key,
  setWeatherData,
  weatherData,
}) => {
  const filtered = data.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filtered.length < 11 && filtered.length > 1 ? (
        <CountryList
          filtered={filtered}
          handleButton={handleButton}
          currentCountry={currentCountry}
          displayCountry={displayCountry}
          api_key={api_key}
          setWeatherData={setWeatherData}
          weatherData={weatherData}
        />
      ) : filtered.length === 1 ? (
        <Country
          country={filtered[0]}
          api_key={api_key}
          setWeatherData={setWeatherData}
          weatherData={weatherData}
        />
      ) : (
        "Too many mathces, specify another filter."
      )}
    </div>
  );
};

const Country = ({ country, api_key, setWeatherData, weatherData }) => {
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`
      )
      .then((response) => setWeatherData(response.data));
  }, [api_key, country.capital, setWeatherData]);
  console.log(JSON.stringify(weatherData, null, 2));
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h2>Weather in {country.capital[0]}</h2>
      <div>
        <b>temperature:</b> {weatherData.current.temperature} Celsius
      </div>
      <div>
        <img src={weatherData.current.weather_icons[0]} alt="weather" />
      </div>
      <div>
        <b>Wind:</b> {weatherData.current.wind_speed} ms direction{" "}
        {weatherData.current.wind_dir}
      </div>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [displayCountry, setDisplayCountry] = useState(false);
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 0,
      weather_icons: [""],
      wind_speed: 0,
      wind_dir: "",
    },
  });
  const api_key = process.env.REACT_APP_API_KEY;

  const handleButton = (country) => {
    return (event) => {
      event.preventDefault();
      setDisplayCountry(true);
      setCurrentCountry(country);
    };
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Search
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Results
        data={countries}
        search={search}
        currentCountry={currentCountry}
        handleButton={handleButton}
        displayCountry={displayCountry}
        api_key={api_key}
        setWeatherData={setWeatherData}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
