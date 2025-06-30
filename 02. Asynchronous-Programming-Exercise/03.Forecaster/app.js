function attachEvents() {
  const forecastUI = document.getElementById("forecast");

  const currentDayUI = document.getElementById("current");
  const upcomingDaysUI = document.getElementById("upcoming");

  const locationRef = document.getElementById("location");
  const submitBtn = document.getElementById("submit");

  const weatherSymbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°",
  };

  const BASE_URL = "http://localhost:3030/jsonstore/forecaster";
  const LOCATIONS_URL = `${BASE_URL}/locations`;

  submitBtn.addEventListener("click", getWeatherData);

  function clearUI() {
    currentDayUI.innerHTML = `<div class="label">Current conditions</div>`;
    upcomingDaysUI.innerHTML = `<div class="label">Three-day forecast</div>`;
    forecastUI.style.display = "none";
    locationRef.value = "";
  }

  async function getWeatherData() {
    const location = locationRef.value.trim();
    if (!location) return;

    clearUI();

    try {
      const code = await getLocationCode(location);
      if (!code) throw new Error("Location not found");

      const [todayData, upcomingData] = await Promise.all([
        fetch(`${BASE_URL}/today/${code}`).then((res) => res.json()),
        fetch(`${BASE_URL}/upcoming/${code}`).then((res) => res.json()),
      ]);

      displayCurrentWeather(todayData);
      displayUpcomingWeather(upcomingData);
      forecastUI.style.display = "block";
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching weather data");
    }
  }

  async function getLocationCode(locationName) {
    const response = await fetch(LOCATIONS_URL);
    const data = await response.json();
    const location = Object.values(data).find(
      (loc) => loc.name.toLowerCase() === locationName.toLowerCase()
    );
    return location?.code;
  }

  function displayCurrentWeather(data) {
    const symbol = weatherSymbols[data.forecast.condition] || "";

    currentDayUI.innerHTML += `
      <div class="forecasts">
        <span class="condition symbol">${symbol}</span>
        <span class="condition">
          <span class="forecast-data">${data.name}</span>
          <span class="forecast-data">${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}</span>
          <span class="forecast-data">${data.forecast.condition}</span>
        </span>
      </div>
    `;
  }

  function displayUpcomingWeather(data) {
    const forecastContainer = document.createElement("div");
    forecastContainer.className = "forecast-info";

    data.forecast.forEach((day) => {
      const symbol = weatherSymbols[day.condition] || "";
      forecastContainer.innerHTML += `
        <span class="upcoming">
          <span class="symbol">${symbol}</span>
          <span class="forecast-data">${day.low}${weatherSymbols.Degrees}/${day.high}${weatherSymbols.Degrees}</span>
          <span class="forecast-data">${day.condition}</span>
        </span>
      `;
    });

    upcomingDaysUI.appendChild(forecastContainer);
  }
}

attachEvents();
