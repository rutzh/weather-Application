function updateWeather(response){

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
humidity.innerHTML=response.data.temperature.humidity;
console.log(response);
//
let wind = document.querySelector("#wind-speed");
wind.innerHTML= `${response.data.wind.speed} km/hr`;
//
let date = new Date(response.data.time * 1000);
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(date)

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
function formatDate(date){

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
  
function getForecast(city){
  let apiKey = "ff38a5fa61btbc02750247354o85830a ";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query={query}&key={key} `;
  axios.get(apiUrl).then(displayForecast);

}
}
function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });
   let forecastElement = document.querySelector("#forecast");
   forecastElement.innerHTML = forecastHtml;
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changeCity);
searchCity("Bloemfontein");
displayForecast();

