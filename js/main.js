function getCountries() {
  let apiUrl = "https://restcountries.com/v3.1/all";

  // make a GET request to the API URL using the fetch() method
  fetch(apiUrl)
    .then((response) => response.json()) // parse the JSON data returned by the API
    .then((data) => {
      data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
      // populate the country select dropdown with the country names
      let countrySelectElement = document.getElementById("countrySelect");
      data.forEach((country) => {
        let optionElement = document.createElement("option");
        optionElement.value = country.cca2;
        optionElement.text = country.name.common;
        countrySelectElement.appendChild(optionElement);
      });
    })
    .catch((error) => console.error(error)); // log any errors to the console
}

function modeChange() {
  const myCheckbox = document.getElementById("myCheckbox");
  if (myCheckbox.checked) {
    localStorage.setItem("darkmode", "true");
    toggleDarkMode();
  } else {
    localStorage.setItem("darkmode", "false");
    toggleDarkMode();
  }
}

function toggleDarkMode() {
  const isDarkModeEnabled = localStorage.getItem("darkmode") === "true";
  const myCheckbox = document.getElementById("myCheckbox");
  const cardElements = document.querySelectorAll(".card");
  const slider = document.querySelector(".slider");
  const body = document.body;
  const input1 = document.getElementById("cityInput");
  const input2 = document.getElementById("countrySelect");

  myCheckbox.checked = isDarkModeEnabled;
  slider.style.backgroundColor = isDarkModeEnabled ? "grey" : "skyblue";
  body.style.backgroundColor = isDarkModeEnabled ? "#131313" : "#EBEBEB";
  body.style.color = isDarkModeEnabled ? "white" : "#222222";
  input1.style.color = isDarkModeEnabled ? "#F8F8F8" : "#262626";
  input1.style.backgroundColor = isDarkModeEnabled ? "#262626" : "#F8F8F8";

  input2.style.color = isDarkModeEnabled ? "#F8F8F8" : "#262626";
  input2.style.backgroundColor = isDarkModeEnabled ? "#262626" : "#F8F8F8";
  cardElements.forEach((card) => {
    card.style.backgroundColor = isDarkModeEnabled ? "#1F1F1F" : "#FFFFFF";
    card.style.border = isDarkModeEnabled
      ? "1px solid #2C2C2C"
      : "1px solid #ccc";
    card.style.boxShadow = isDarkModeEnabled
      ? "0 8px 16px 0 rgba(255, 255, 255, 0.2)"
      : "0 8px 16px 0 #C0C0C0";
  });

  const mutedText = document.querySelector(".muted-text");
  mutedText.style.color = isDarkModeEnabled ? "white" : "grey";

  // localStorage.setItem("darkmode", !isDarkModeEnabled);
}

function show() {
  let loader = document.getElementById("loader");
  let searchBox = document.getElementById("searchBox");
  let cityInput = document.getElementById("cityInput");
  let btn = document.getElementById("btn");
  let countrySelect = document.getElementById("countrySelect");
  let weatherInfo = document.getElementById("weatherData");
  let forecastInfo = document.getElementById("forecastContainer");

  // Add the "loader" class to show the loader
  loader.classList.add("loader");

  // Reset the input and select elements
  cityInput.value = "";
  btn.disabled = true;
  countrySelect.value = "AF";
  countrySelect.name = "Afganishtan";

  // Hide the weather data and show the search box
  weatherInfo.innerHTML = "";
  forecastInfo.innerHTML = "";

  // Remove the "loader" class to hide the loader
  setTimeout(() => {
    loader.classList.remove("loader");
    searchBox.style.display = "block";
  }, 500);
}

function buttonClickable() {
  let cityName = document.getElementById("cityInput").value;
  let button = document.getElementById("btn");
  if (cityName === "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
function degreesToDirection(degrees) {
  const directions = [
    "North",
    "North East",
    "East",
    "South East",
    "South",
    "South West",
    "West",
    "North West",
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function getWeather() {
  document.getElementById("loader").classList.add("loader");
  let weatherDataElement = document.getElementById("weatherData");
  weatherDataElement.innerHTML = ` `;
  let cityName = document.getElementById("cityInput").value.trim();
  let countryName = document.getElementById("countrySelect").value;
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${YOUR_API_KEY}&units=metric`;
  let currentWeatherPromise = fetch(currentWeatherUrl);

  // Make a GET request to the 5-day forecast API URL using the fetch() method
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryName}&appid=${YOUR_API_KEY}&units=metric&cnt=40`;
  let forecastPromise = fetch(forecastUrl);

  // make a GET request to the API URL using the fetch() method
  Promise.all([currentWeatherPromise, forecastPromise])
    .then((responses) => Promise.all(responses.map((r) => r.json()))) // parse the JSON data returned by the APIs
    .then(([currentWeatherData, forecastData]) => {
      if (currentWeatherData["cod"] == 200 && forecastData["cod"] == "200") {
        document.getElementById("loader").classList.remove("loader");
        let searchBox = document.getElementById("searchBox");
        searchBox.style.display = "none";
        let weatherInfo = document.getElementById("weatherData");
        weatherInfo.style.display = "block";
        const {
          name,
          sys,
          main,
          weather,
          wind,
          clouds,
          dt,
          timezone,
          visibility,
        } = currentWeatherData;
        const { country, sunrise, sunset } = sys;
        const { temp, feels_like, pressure, humidity } = main;
        const { description, icon } = weather[0];
        const { speed, deg } = wind;
        const { all } = clouds;
        const time = dt;
        // display the weather data in the HTML page_code
        let weatherDataElement = document.getElementById("weatherData");
        const utcTime = new Date(dt * 1000 + timezone * 1000);
        const visible = visibility / 1000;
        const windDirection = degreesToDirection(deg);
        const windSpeed = (speed * 3.6).toFixed(2);
        // Convert UTC time to local time
        const localTime = new Date(
          utcTime.getTime() + new Date().getTimezoneOffset() * 60 * 1000
        );

        // Specify time format options
        const timeOptions = { hour12: true, hourCycle: "h12" };

        weatherDataElement.innerHTML = `
        <div class="card">
        <div class="card-header">
          <div>
            <p>Current Weather of: <i class="fa fa-map-marker" aria-hidden="true"></i> <b>${name}, ${country}</b></p>
          </div>
          <div class="time">
            <span class="muted-text">
              <small>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                Last updated at: ${localTime.toLocaleTimeString(
                  [],
                  timeOptions
                )}<br>local time
              </small>
            </span>
          </div>
        </div>
        <hr>
        <div class="weather-info">
          <div class="weather-description">
            <h4>${temp}°C<br>${description}</h4>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
          </div>
          <br>
          <div class="weather-details">
            <div class="detail">
              <i class="fa fa-registered" aria-hidden="true"></i>
              <span>Real feel: ${feels_like}°C</span>
            </div>
            <div class="detail">
              <i class="fa fa-compress" aria-hidden="true"></i>
              <span>Air Pressure: ${pressure} mb</span>
            </div>
            <div class="detail">
              <i class="fa fa-tint" aria-hidden="true"></i>
              <span>Humidity: ${humidity}%</span>
            </div>
            <div class="detail">
              <i class="fa fa-cloud" aria-hidden="true"></i>
              <span>Cloudiness: ${all}%</span>
            </div>
            <div class="detail">
              <i class="fa fa-superpowers" aria-hidden="true"></i>
              <span>Wind speed: ${windSpeed} km/h</span>
            </div>
            <div class="detail">
              <i class="fa fa-arrows" aria-hidden="true"></i>
              <span>Wind direction: ${deg}° ${windDirection}</span>
            </div>
            <div class="detail">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              <span>Sunrise: ${new Date(
                sunrise * 1000
              ).toLocaleTimeString()}</span>
            </div>
            <div class="detail">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              <span>Sunset: ${new Date(
                sunset * 1000
              ).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <hr>
        <button class="button" onclick="show()">See another</button>
        <button class="button" onclick="getWeather()">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
      </div>
      
  
      `;
        const forecastContainer = document.getElementById("forecastContainer");
        forecastContainer.innerHTML = "";
        forecastContainer.style.display = "flex";
        forecastContainer.style.flexWrap = "nowrap";
        const filteredForecast = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        // .slice(2);
        filteredForecast.forEach((forecast) => {
          // get the forecast data
          const { dt_txt, main, weather, dt } = forecast;
          const { temp } = main;
          const { description, icon } = weather[0];
          const date = new Date(dt_txt);
          const dayOfWeek = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(date);
          const cardHtml = `
          <div class="weather-card column card">
            <div>${dayOfWeek} </div> <br>
            
            <div>${temp.toFixed(2)}&deg;C</div>
            <div><img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}" ></div>
            <div>${description}</div> <br>
          </div>
        `;
          forecastContainer.innerHTML += cardHtml;
        });
        toggleDarkMode();
      } else {
        document.getElementById("loader").classList.remove("loader");
        let weatherDataElement = document.getElementById("weatherData");
        weatherDataElement.innerHTML = `
        <span style="color:red"><h1>City not found <i class="fa fa-times" aria-hidden="true"></h1></i></span>
    `;
      }
    })
    .catch((error) => {
      // display the error message in the HTML page
      let weatherDataElement = document.getElementById("weatherData");
      weatherDataElement.innerHTML = `
      <span>${error}</span>
    `;
    });
}

window.onload = function () {
  getCountries();
  let loader = document.getElementById("loader");
  let searchBox = document.getElementById("searchBox");
  searchBox.style.display = "none";
  loader.classList.add("loader");

  setTimeout(() => {
    loader.classList.remove("loader");
    searchBox.style.display = "block";
  }, 500);
  toggleDarkMode();
};
