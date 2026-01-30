const countrySelect = document.getElementById("global-country");
const citySelect = document.getElementById("global-city");
const exploreBtn = document.getElementById("global-search-btn");
const yearSelect = document.getElementById("global-year");
const box = document.getElementById("selected-destination");
const selectedCountryName = document.getElementById("selected-country-name");
const selectedCityName = document.getElementById("selected-city-name");
const selectedFlag = document.getElementById("selected-country-flag");
const clearBtn = document.getElementById("clear-selection-btn");
const holidaysContent = document.getElementById("holidays-content");
const dashboardFlag = document.querySelector(".dashboard-country-flag");
const dashboardName = document.querySelector(".dashboard-country-title h3");
const dashboardOfficial = document.querySelector(".official-name");
const dashboardRegion = document.querySelector(".region");

const capitalValue = document.querySelector(".dashboard-country-detail:nth-child(1) .value");
const populationValue = document.querySelector(".dashboard-country-detail:nth-child(2) .value");
const areaValue = document.querySelector(".dashboard-country-detail:nth-child(3) .value");
const continentValue = document.querySelector(".dashboard-country-detail:nth-child(4) .value");
const timezoneValue = document.querySelector(".local-time-zone");
const mapLink = document.querySelector(".btn-map-link");

const weatherView = document.getElementById("weather-view");
const weatherCityName = weatherView.querySelector(".weather-location span");
const weatherDate = weatherView.querySelector(".weather-time");
const weatherTemp = weatherView.querySelector(".weather-hero-temp .temp-value");
const weatherCondition = weatherView.querySelector(".weather-condition");
const weatherFeels = weatherView.querySelector(".weather-feels");
const weatherHigh = weatherView.querySelector(".weather-high-low .high");
const weatherLow = weatherView.querySelector(".weather-high-low .low");
const humidityValue = weatherView.querySelector(".weather-detail-card .detail-value"); 



const appState = {
  countryCode: "",
  countryName: "",
  city: "",
  year: ""
};


function show(view) {
  document.querySelectorAll('.view').forEach(s => s.style.display = 'none'); 
  document.getElementById(view+'-view').style.display = 'block'; 
}


document.querySelectorAll('.nav-item').forEach(b => {
  b.onclick = e => {
    e.preventDefault();
    show(b.dataset.view); 
  }
});


show('dashboard');

async function getCountries() {
  const response = await fetch("https://date.nager.at/api/v3/AvailableCountries");
  const data = await response.json();
  console.log(data);

  data.forEach(country => {
    const option = document.createElement("option");
    option.value = country.countryCode;
    option.text = country.name;
    countrySelect.appendChild(option);

  });



}

getCountries();


async function getCapitals() {
  if (!appState.countryCode) return;

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${appState.countryCode}`
  );

  const data = await response.json();
  const country = data[0];

  citySelect.innerHTML = '<option value="">Select City</option>';

  
  const capital = country.capital[0];

  if (capital) {
    const option = document.createElement("option");
    option.value = capital;
    option.text = capital;
    citySelect.appendChild(option);
  }

  console.log("Capital:", capital);
}



citySelect.addEventListener("change", () => {
  appState.city = citySelect.value; 
  console.log("Selected city stored in appState:", appState.city);

  
});



countrySelect.addEventListener("change", async () => {
  appState.countryCode = countrySelect.value;

 
  citySelect.innerHTML = '<option value="">Select City</option>';

  if (appState.countryCode) {
    await getCapitals(); 
  }
});





async function fetchHolidays(state) {
  if (!state.year || !state.countryCode) {
    holidaysContent.innerHTML = "<p>Please select a country and year first.</p>";
    return [];
  }

  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${state.year}/${state.countryCode}`
  );
  const data = await response.json();

  return data;
}



exploreBtn.addEventListener("click", async () => {
  
  appState.countryCode = countrySelect.value;
  appState.countryName = countrySelect.options[countrySelect.selectedIndex].text;
  appState.city = citySelect.value;
  appState.year = yearSelect.value;


  selectedFlag.src = `https://flagcdn.com/w80/${appState.countryCode.toLowerCase()}.png`;
  selectedCountryName.innerText = appState.countryName;
  selectedCityName.innerText = appState.city ? `• ${appState.city}` : "";
  box.classList.remove("hidden");

 
  const holidays = await fetchHolidays(appState);

 
  const cards = holidaysContent.querySelectorAll(".holiday-card");
  cards.forEach((card, i) => {
    if (holidays[i]) {
      const h = holidays[i];
      const parts = h.date.split("-");
      const day = parts[2];
      const month = parts[1];

      card.querySelector(".holiday-date-box .day").innerText = day;
      card.querySelector(".holiday-date-box .month").innerText = month;
      card.querySelector("h3").innerText = h.localName;
      card.querySelector(".holiday-name").innerText = h.name;
      card.querySelector(".holiday-day-badge").innerText = "Day"; 
      card.style.display = "block"; 
    } else {
      card.style.display = "none"; 
    }
  });

});


function updateCountryDashboard(country) {
  dashboardFlag.src = country.flags.png;
  dashboardFlag.alt = country.name.common;

  dashboardName.innerText = country.name.common;
  dashboardOfficial.innerText = country.name.official;

  dashboardRegion.innerText =
    country.continents[0] + " • " + country.subregion;

  capitalValue.innerText = country.capital[0];
  populationValue.innerText = country.population.toLocaleString();
  areaValue.innerText = country.area.toLocaleString() + " km²";
  continentValue.innerText = country.continents[0];

  timezoneValue.innerText = country.timezones[0];
  mapLink.href = country.maps.googleMaps;
}


async function fetchCountryData() {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${appState.countryCode}`
  );

  const data = await response.json();
  const country = data[0];


  updateCountryDashboard(country);
}



exploreBtn.addEventListener("click", async () => {

 
  appState.countryCode = countrySelect.value;
  appState.countryName =
    countrySelect.options[countrySelect.selectedIndex].text;
  appState.city = citySelect.value;
  appState.year = yearSelect.value;

 
  selectedFlag.src = `https://flagcdn.com/w80/${appState.countryCode.toLowerCase()}.png`;
  selectedCountryName.innerText = appState.countryName;
  selectedCityName.innerText = appState.city ? `• ${appState.city}` : "";
  box.classList.remove("hidden");


  await fetchCountryData();

  
  const holidays = await fetchHolidays(appState);

  const cards = holidaysContent.querySelectorAll(".holiday-card");
  cards.forEach((card, i) => {
    if (holidays[i]) {
      const h = holidays[i];
      const parts = h.date.split("-");

      card.querySelector(".holiday-date-box .day").innerText = parts[2];
      card.querySelector(".holiday-date-box .month").innerText = parts[1];
      card.querySelector("h3").innerText = h.localName;
      card.querySelector(".holiday-name").innerText = h.name;
      card.querySelector(".holiday-day-badge").innerText = "Day";
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});



exploreBtn.addEventListener("click", async () => {
  appState.countryCode = countrySelect.value;
  appState.countryName =
  countrySelect.options[countrySelect.selectedIndex].text;

  appState.year = yearSelect.value;


  await fetchCountryData(); 
});

clearBtn.addEventListener("click", () => {
  box.classList.add("hidden");

  countrySelect.value = "";
  citySelect.value = "";
  yearSelect.value = "";

  appState.countryCode = "";
  appState.countryName = "";
  appState.city = "";
  appState.year = "";

  const cards = holidaysContent.querySelectorAll(".holiday-card");
  cards.forEach(card => card.style.display = "none");
});


/*
async function getWeather(cityName, countryCode) {
  const geo = await fetch(`https://nominatim.openstreetmap.org/search?city=${cityName}&countrycodes=${countryCode}&format=json&limit=1`);
  const weatherData= await geo.json();
  const { lat, lon } = weatherData[0];

  const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  const data = await weather.json();

  console.log(data);


}


getWeather("Cairo", "EG");*/
































































































































