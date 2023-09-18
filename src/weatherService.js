require('dotenv').config();

const API_KEY = process.env.API_KEY;

const makeIconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data)

    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name } = data

    const { description, icon } = weather[0]

    return {
        description, temp, temp_max, temp_min, pressure, speed, country, name, feels_like, humidity,
        iconURL: makeIconUrl(icon)
    }
}

export { getWeatherData }