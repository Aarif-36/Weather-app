      
    // enter key event listener for city input
       const cityInput = document.getElementById("cityInput");

        cityInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                getWeather(); // Calls your weather function
            }
        });

       
       // Clear button functionality
       const input = document.getElementById('cityInput');
       const clearBtn = document.querySelector('.clear-btn');

        input.addEventListener('input', () => {
            clearBtn.style.display = input.value ? 'block' : 'none';
        });

        function clearInput() {
            input.value = '';
            clearBtn.style.display = 'none';
        }



        // Fetch weather data for default city on page load
        window.onload = function () {
            getWeather("Coimbatore");
        };
                
        function getWeather(city = null) {

            city = city || document.getElementById('cityInput').value;

            if (!city) {
                document.getElementById('error-msg').textContent = '!Enter a city name';
                return;
            }

            document.getElementById('error-msg').textContent = '';

            const apiKey = '9f916d6f6d91c8c1a294af2de5b2ab39'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())  
                .then(data => { 
                    if (data.cod !== 200) {
                         document.getElementById('error-msg').textContent = data.message;
                         return;
                    } else {
                        const timezoneOffset = data.timezone;
                        const localTime = new Date(Date.now() + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
                        const hours = localTime.getHours();
                        const dayNight = (hours >= 6 && hours < 18) ? "🌞 Day" : "🌙 Night";
                        
                        const timeString = localTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                        });

                        document.getElementById("dayNight").innerHTML =`${dayNight} | ${timeString}`;

                        const sunriseTime = new Date(
                                (data.sys.sunrise + data.timezone) * 1000
                            ).toUTCString().match(/\d{2}:\d{2}/)[0];

                            const sunsetTime = new Date(
                                (data.sys.sunset + data.timezone) * 1000
                            ).toUTCString().match(/\d{2}:\d{2}/)[0];

                            document.getElementById("sunrise").innerHTML = `${sunriseTime}`;
                            document.getElementById("sunset").innerHTML = `${sunsetTime}`;


                        const weatherIcon = data.weather[0].description;
                        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                        const countryName = regionNames.of(data.sys.country);
                        document.getElementById('dist').innerHTML = `${data.name}, ${countryName}`;
                        document.getElementById('temp').innerHTML = `${Math.floor(data.main.temp)} °C`;
                        changeWeather(weatherIcon);
                        document.getElementById('weather-desc').innerHTML = `${data.weather[0].description}`;
                        document.getElementById('wind-speed').innerHTML = `${Math.round(data.wind.speed * 3.6)}km/hr`;
                        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;

                        const weather = data.weather[0].main;
                        changeBackground(weather);

                        console.log(data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data.</p>`;
                });
        }

       // Function to change background based on weather condition
        function changeBackground(weather) {
   
        console.log("Weather:", weather);

        // const body = document.body;
        const video = document.getElementById("bgVideo");

        switch(weather.toLowerCase()) {
        case "clear":
            video.src = "videos/clear.mp4";
            break;

        case "clouds":
            video.src = "videos/fewclouds.mp4";
            break;

        case "rain":
             video.src = "videos/rain.mp4";
            break;

        case "smoke":
            video.src = "videos/smoke.mp4";
            break;
         
        default:
            video.src = "videos/smoke.mp4";;
    }
}

       // Function to change weather icon based on weather condition
        function changeWeather(iconCode) { 
        // Implementation for changing weather icon
    
       const weatherIcon =  document.getElementById('weather-icon')
     
        switch(iconCode) {

            case "clear sky":
            case "few clouds":
            case "broken clouds":
            case "scattered clouds":
                weatherIcon.src = "Image/cloudy.svg";
                break;

            case "rain":
            case "light rain":
                weatherIcon.src = "Image/rain.svg";
                break;

            case "smoke":
                weatherIcon.src = "Image/smoke.svg";
                break;

            case "overcast clouds":
                weatherIcon.src = "Image/overcast.svg";
                break;

            default:
                weatherIcon.src = "Image/cloudy.svg";
        }
    }


    