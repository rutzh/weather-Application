function changeCity(event) {
    event.preventDefault();
let searchInput = document.querySelector("#search-input");
let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchInput.value;

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changeCity);