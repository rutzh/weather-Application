function updateWeather(response){

let currentTemperature = document.querySelector("#current-temperature");
temperature = response.data.temperature.current;
currentTemperature.innerHTML = Math.round(temperature);

let cityName = document.querySelector("#city-name");
cityName.innerHTML = response.data.city;

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changeCity);
searchCity("Bloemfontein");