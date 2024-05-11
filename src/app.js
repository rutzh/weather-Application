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
/*
let weatherIcon = document.querySelector("#weather-app-icon");
weatherIcon.innerHTML = response.data.condition.icon_url;
*/
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
  

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changeCity);
searchCity("Bloemfontein");

