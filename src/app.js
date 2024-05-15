function updateWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  temperature = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(temperature);
  //
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;
  //
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  //
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  console.log(response);
  //
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${response.data.wind.speed} km/hr`;
  //
  let date = new Date(response.data.time * 1000);
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(date);

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

   getForecast(response.data.city);
}



function searchCity(cityName) {
  let apiKey = "ff38a5fa61btbc02750247354o85830a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ff38a5fa61btbc02750247354o85830a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

searchCity("Bloemfontein");
