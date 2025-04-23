document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMessage = document.getElementById('error-message');
    const weatherContainer = document.getElementById('weather-container');
    
    // Elementos de exibição do tempo
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    
    // API Key do OpenWeather - substitua pela sua chave
    const API_KEY = '6d7a25d481231d648b70f395b0f469d3';
    
    // Função para buscar dados do tempo
    async function fetchWeather(city) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            
            const data = await response.json();
            displayWeather(data);
            errorMessage.textContent = '';
            weatherContainer.classList.remove('hidden');
            cityInput.value = ''; // Limpa o input após a busca
        } catch (error) {
            errorMessage.textContent = 'Cidade não encontrada. Tente novamente.';
            weatherContainer.classList.add('hidden');
            console.error('Erro ao buscar dados:', error);
        }
    }
    
    // Função para exibir os dados do tempo
    function displayWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
        
        // Definir ícone com base nas condições do tempo
        const weatherMain = data.weather[0].main;
        let iconClass = 'fa-sun';
        
        switch(weatherMain) {
            case 'Clear':
                iconClass = 'fa-sun';
                break;
            case 'Clouds':
                iconClass = 'fa-cloud';
                break;
            case 'Rain':
                iconClass = 'fa-cloud-rain';
                break;
            case 'Snow':
                iconClass = 'fa-snowflake';
                break;
            case 'Thunderstorm':
                iconClass = 'fa-bolt';
                break;
            default:
                iconClass = 'fa-cloud-sun';
        }
        
        weatherIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }
    
    // Evento de clique no botão de busca
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            errorMessage.textContent = 'Por favor, digite o nome de uma cidade';
        }
    });
    
    // Evento de pressionar Enter no input
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            } else {
                errorMessage.textContent = 'Por favor, digite o nome de uma cidade';
            }
        }
    });
});