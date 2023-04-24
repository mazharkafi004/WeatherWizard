function getCountries() {
  var apiUrl = "https://restcountries.com/v3.1/all";

  // make a GET request to the API URL using the fetch() method
  fetch(apiUrl)
    .then((response) => response.json()) // parse the JSON data returned by the API
    .then((data) => {
      data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
      // populate the country select dropdown with the country names
      var countrySelectElement = document.getElementById("countrySelect");
      data.forEach((country) => {
        var optionElement = document.createElement("option");
        optionElement.value = country.cca2;
        optionElement.text = country.name.common;
        countrySelectElement.appendChild(optionElement);
      });
    })
    .catch((error) => console.error(error)); // log any errors to the console
}

function modeChange() {
  const myCheckbox = document.getElementById("myCheckbox");
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  var slider = document.querySelector(".slider");
  if (myCheckbox.checked) {
    slider.style.backgroundColor = "grey";
    document.body.style.backgroundColor = "#131313";
    document.body.style.color = "white";
    card1.style.backgroundColor = "#1F1F1F";
    card1.style.border = "1px solid #2C2C2C";
    card2.style.border = "1px solid #2C2C2C";
    card2.style.backgroundColor = "#1F1F1F";
  } else {
    slider.style.backgroundColor = "skyblue";
    document.body.style.backgroundColor = "#EBEBEB";
    document.body.style.color = "#222222";
    card1.style.backgroundColor = "#FFFFFF";
    card1.style.border = "1px solid #ccc";
    card2.style.border = "1px solid #ccc";
    card2.style.backgroundColor = "#FFFFFF";
  }
}

function show() {
  document.getElementById("cityInput").value = "";
  var btn = document.getElementById("btn");
  btn.disabled = true;
  document.getElementById("countrySelect").value = "";
  var weatherInfo = document.getElementById("weatherData");
  var searchBox = document.getElementById("searchBox");
  searchBox.style.display = "block";
  weatherInfo.style.display = "none";
}
function buttonClickable() {
  var cityName = document.getElementById("cityInput").value;
  var button = document.getElementById("btn");
  if (cityName === "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
function getWeather() {
  var cityName = document.getElementById("cityInput").value;
  var countryName = document.getElementById("countrySelect").value;
  var apiKey = "8534e453e695aaa750bc5470cc2fced9";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${apiKey}&units=metric`;

  // make a GET request to the API URL using the fetch() method
  fetch(apiUrl)
    .then((response) => response.json()) // parse the JSON data returned by the API
    .then((data) => {
      if (data["cod"] == 200) {
        var searchBox = document.getElementById("searchBox");
        searchBox.style.display = "none";
        var weatherInfo = document.getElementById("weatherData");
        weatherInfo.style.display = "block";

      
        const { name, sys, main, weather, wind, clouds, dt, timezone } = data;
        const { country, sunrise, sunset } = sys;
        const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
          main;
        const { description, icon } = weather[0];
        const { speed, deg } = wind;
        const { all } = clouds;
        // const {current_time} = dt;
        // q=${cityName},${countryName}&appid=${apiKey}&units=metric` ;
        // display the weather data in the HTML page_code
        var weatherDataElement = document.getElementById("weatherData");
        const utcTime = new Date(dt * 1000 + timezone * 1000);

        // Convert UTC time to local time
        const localTime = new Date(
          utcTime.getTime() + new Date().getTimezoneOffset() * 60 * 1000
        );

        // Specify time format options
        const timeOptions = { hour12: true, hourCycle: "h12" };

        weatherDataElement.innerHTML = `
        <div id="card1" class="card">
        <p>Current Weather of: <b>${name}, ${country}</b> </p> <br>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" style="width: 10%">
        <br>
        <div class="container">
        <p>${description}</p>
        <span class="muted-text"><small>last updated at: ${localTime.toLocaleTimeString(
          [],
          timeOptions
        )} local time</small></span>
<br>
        </div>
      </div>
        <div id="card2" class="card">
        <div class="container">
        
        <hr class="solid">
        <p>Temperature: ${temp}°C</p>
        <p>Feels like: ${feels_like}°C</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${speed} m/s</p>
        <p>Wind direction: ${deg}°</p>
        <p>Cloudiness: ${all}%</p>
        <p>Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <br>
        <hr>
        <button class="button" onclick="show()">See another</button>
      </div>
  
      `
      var checkbox = document.getElementById("myCheckbox");

      var card1 = document.getElementById("card1");
      var card2 = document.getElementById("card2");
    
      if (checkbox.checked) {
        card1.style.backgroundColor = "#1F1F1F";
        card1.style.border = "1px solid #2C2C2C";
        card2.style.border = "1px solid #2C2C2C";
        card2.style.backgroundColor = "#1F1F1F";
      } else {
        card1.style.backgroundColor = "#FFFFFF";
        card1.style.border = "1px solid #ccc";
        card2.style.border = "1px solid #ccc";
        card2.style.backgroundColor = "#FFFFFF";
      }
      } else {
        var weatherDataElement = document.getElementById("weatherData");
        weatherDataElement.innerHTML = `
      <p>City and Country combinations isn't correct</p>
    `;
      }
    })
    .catch((error) => {
      // display the error message in the HTML page
      var weatherDataElement = document.getElementById("weatherData");
      weatherDataElement.innerHTML = `
      <p>${error}</p>
    `;
    });
}

window.onload = function () {
  getCountries();
};
