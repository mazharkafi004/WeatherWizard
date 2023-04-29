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
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  const slider = document.querySelector(".slider");
  const mutedText = document.querySelector(".muted-text");

  if (isDarkModeEnabled) {
    myCheckbox.checked = true;
    slider.style.backgroundColor = "grey";
    document.body.style.backgroundColor = "#131313";
    document.body.style.color = "white";
    card1.style.backgroundColor = "#1F1F1F";
    card1.style.border = "1px solid #2C2C2C";
    card2.style.border = "1px solid #2C2C2C";
    card2.style.backgroundColor = "#1F1F1F";
    card1.style.boxShadow = "0 8px 16px 0 rgba(255, 255, 255, 0.2)";
    card2.style.boxShadow = "0 8px 16px 0 rgba(255, 255, 255, 0.2)";
    mutedText.style.color = "white";
  } else {
    myCheckbox.checked = false;
    slider.style.backgroundColor = "skyblue";
    document.body.style.backgroundColor = "#EBEBEB";
    document.body.style.color = "#222222";
    card1.style.backgroundColor = "#FFFFFF";
    card1.style.border = "1px solid #ccc";
    card2.style.border = "1px solid #ccc";
    card2.style.backgroundColor = "#FFFFFF";
    card1.style.boxShadow = "0 8px 16px 0 #C0C0C0";
    card2.style.boxShadow = "0 8px 16px 0 #C0C0C0";
    mutedText.style.color = "grey";
  }

  // localStorage.setItem("darkmode", !isDarkModeEnabled);
}
function show() {
  let loader = document.getElementById("loader");
  let searchBox = document.getElementById("searchBox");
  let cityInput = document.getElementById("cityInput");
  let btn = document.getElementById("btn");
  let countrySelect = document.getElementById("countrySelect");
  let weatherInfo = document.getElementById("weatherData");

  // Add the "loader" class to show the loader
  loader.classList.add("loader");

  // Reset the input and select elements
  cityInput.value = "";
  btn.disabled = true;
  countrySelect.value = "AF";
  countrySelect.name = "Afganishtan";

  // Hide the weather data and show the search box
  weatherInfo.innerHTML = "";

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${process.env.API_KEY}&units=metric`;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${window.env.API_KEY}&units=metric`;

  // make a GET request to the API URL using the fetch() method
  fetch(apiUrl)
    .then((response) => response.json()) // parse the JSON data returned by the API
    .then((data) => {
      if (data["cod"] == 200) {
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
        } = data;
        const { country, sunrise, sunset } = sys;
        const { temp, feels_like, pressure, humidity } = main;
        const { description, icon } = weather[0];
        const { speed, deg } = wind;
        const { all } = clouds;
        // const {current_time} = dt;
        // q=${cityName},${countryName}&appid=${apiKey}&units=metric` ;
        // display the weather data in the HTML page_code
        let weatherDataElement = document.getElementById("weatherData");
        const utcTime = new Date(dt * 1000 + timezone * 1000);
        const visible = visibility / 1000;
        const windDirection = degreesToDirection(deg);
        // Convert UTC time to local time
        const localTime = new Date(
          utcTime.getTime() + new Date().getTimezoneOffset() * 60 * 1000
        );

        // Specify time format options
        const timeOptions = { hour12: true, hourCycle: "h12" };

        weatherDataElement.innerHTML = `
        <div id="card1" class="card">
        <div class="card-header">
        <div>
        <p>Current Weather of:<i class="fa fa-map-marker" aria-hidden="true"></i> <b>${name}, ${country} </b></p>
        </div>
        <div class="time">
        <span class="muted-text"><small><i class="fa fa-clock-o" aria-hidden="true"></i> Last updated at: ${localTime.toLocaleTimeString(
          [],
          timeOptions
        )}<br>local time</small></span>
          </div>
          </div>
          <hr>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" style="width: 10%"> 
        <br>
        <div class="container">
        <p>${description} </p>
        <br>
        </div>
        </div>
        <div id="card2" class="card">
        <div class="container">
        
        <hr class="solid">
        <div class="row">
        <div class="column">
          <p><i class="fa fa-thermometer-empty" aria-hidden="true"></i> Temperature: ${temp}°C</p>
          <p><i class="fa fa-registered" aria-hidden="true"></i> Real feel: ${feels_like}°C</p>
          <p><i class="fa fa-compress" aria-hidden="true"></i> Air Pressure: ${pressure} mb</p>
          <p><i class="fa fa-tint" aria-hidden="true"></i> Humidity: ${humidity}%</p>
          <p><i class="fa fa-eye" aria-hidden="true"></i> Visibility: ${visible}km</p>
        </div>
          <div class="column">
          <p><i class="fa fa-superpowers" aria-hidden="true"></i> Wind speed: ${speed} m/s</p>
          <p><i class="fa fa-arrows" aria-hidden="true"></i> Wind direction: ${deg}° ${windDirection}</p>
          <p><i class="fa fa-cloud" aria-hidden="true"></i> Cloudiness: ${all}%</p>
          <p><span class="material-symbols-outlined" style="font-size: 18px">
          water_lux
          </span> Sunrise:
          </span></i> ${new Date(sunrise * 1000).toLocaleTimeString()}</p>
          <p><span class="material-symbols-outlined" style="font-size: 18px">
          wb_twilight
          </span> Sunset: ${new Date(
            sunset * 1000
          ).toLocaleTimeString()}</p></div>
        </div>

  
        </div>
        <br>
        <hr>
        <button class="button" onclick="show()">See another</button>
        </div>
  
      `;
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
