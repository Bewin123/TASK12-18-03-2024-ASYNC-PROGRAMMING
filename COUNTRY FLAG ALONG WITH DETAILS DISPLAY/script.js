document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch data from Rest Countries API
  const fetchRestCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countriesData = await response.json();
      return countriesData;
    } catch (error) {
      console.error("Error fetching Rest Countries data", error);
    }
  };

  // Function to fetch data from OpenWeatherMap API
  const fetchWeatherData = async (capital, countryCode) => {
    try {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${apiKey}`
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error("Error fetching Weather data", error);
    }
  };

  // Function to render Bootstrap card with country data
  const renderCountryCard = (country) => {
    const cardContainer = document.getElementById("card-container");

    const card = document.createElement("div");
    card.className = "col-lg-4 col-sm-12";

    card.innerHTML = `
            <div class="card">
                <div class="card-header">${country.name.common}</div>
                <img src="${country.flags.png}" class="card-img-top" alt="Flag">
                <div class="card-body">
                    <p class="card-text">
                        <strong>Capital:</strong> ${country.capital[0]}<br>
                        <strong>Region:</strong> ${country.region}<br>
                        <strong>Country Code:</strong> ${country.cca2}<br>
                        <strong>Latitude:</strong> ${country.latlng.join(", ")}
                    </p>
                    <button onclick="fetchWeather('${country.capital[0]}', '${
      country.cca2
    }')" 
        `;

    cardContainer.appendChild(card);
  };

  // Function to fetch weather data and display it in the card
  window.fetchWeather = async (capital, countryCode) => {
    const weatherData = await fetchWeatherData(capital, countryCode);

    // Display weather information (customize as needed)
    alert(
      `Weather in ${capital}, ${countryCode}:\nTemperature: ${weatherData.main.temp}°C\nDescription: ${weatherData.weather[0].description}`
    );
  };

  // Fetch and render country data
  fetchRestCountries().then((countries) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.className = "row"; // Add Bootstrap row class

    countries.forEach((country) => {
      renderCountryCard(country);
    });
  });
});
