import React, { useState } from "react"
import styled from "styled-components"
import CurrentWeather from "./CurrentWeather"
import DailyForecast from "./DailyForecast"
import Header from "./Header"
import HourlyForecast from "./HourlyForecast"
import weatherData from "./mockWeatherData"

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const API_KEY = process.env.REACT_APP_API_KEY

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const buildGeocodingUrl = (search) => {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
}

const buildSevenDayUrl = (lat, lon, unitSystem) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitSystem}`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div``
const NotificationPopUp = styled.div`
  background-color: pink;
  color: red;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Dashboard = () => {
  const [unitSystem, setUnitSystem] = useState(`metric`)
  // const [weatherData, setWeatherData] = useState({ cityName: `` })
  const [query, setQuery] = useState(``)
  const [search, setSearch] = useState(`London`)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // useEffect(() => {
  //   const geocodingUrl = buildGeocodingUrl(search, unitSystem)
  //   console.log(`Loading Data Once.......`)
  //   setIsLoading(true)
  //   axios.get(geocodingUrl).then((response) => {
  //     const { data } = response

  //     if (data.length === 0) {
  //       setIsError(true)
  //       setIsLoading(false)
  //       return 0
  //     }
  //     const { lat, lon } = data[0]

  //     const sevenDayUrl = buildSevenDayUrl(lat, lon, unitSystem)
  //     return axios
  //       .get(sevenDayUrl)
  //       .then((response) => {
  //         const { current, daily, hourly } = response.data

  //         setWeatherData({
  //           cityName: search,
  //           temperature: current.temp,
  //           description: current.weather[0].main,
  //           daily: daily,
  //           hourly: hourly,
  //         })
  //       })
  //       .then(setIsLoading(false))
  //   })
  // }, [search, unitSystem])

  return (
    <Layout>
      <Header
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        query={query}
        setQuery={setQuery}
        setSearch={setSearch}
      />

      {isError && (
        <NotificationPopUp>Invalid city, please try again.</NotificationPopUp>
      )}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1>{search}</h1>
          <CurrentWeather weatherData={weatherData} />
          <DailyForecast dailyForecast={weatherData.daily} />
          <HourlyForecast hourlyForecast={weatherData.hourly} />
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
