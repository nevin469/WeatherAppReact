//Weather React Project by Nevin Bullywon

import React, {useState} from "react";
const api = {//Creating a REST API to fetch data from openweathermap.org
  key: "c163e61259f873803c6523fda7f96046",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter"){//if enter key is pressed
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) //THE API fetches data from the website to display weather results
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) =>{//creating my day,date,month,year variables
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //Fetches the date today
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof weather.main !== "undefined")//if the search box has input
      ? ((weather.main.temp > 16) 
      ? 'app warm'
       : 'app')
       : 'app'}>
      <main>

        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search... City, Country"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
        <div>

          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>

        ) : ('')}
        <div className="credits name">Project by Nevin Bullywon</div>

      </main>
    </div>
  );
}

export default App;
