import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CurrentWeather from "./CurrentWeather"
import GlobalStatistics from "./GlobalStatistics"
import Header from "./Header"
import HourlyForecast from "./HourlyForecast"
import mockWeatherData from "./mockWeatherData"
import Spinner from "./Spinner"

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const API_KEY = process.env.REACT_APP_API_KEY
const DEVELOP_WITH_MOCK_DATA = false

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const buildGeocodingUrl = (search) => {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
}

const buildSevenDayUrl = (lat, lon, unitSystem) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitSystem}`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div``

const NotificationPopUp = styled.div`
  background-color: white;
  color: red;
  height: 50px;
  div {
    width: 400px;
    padding-top: 10px;
    font-size: 24px;
    margin: 0 auto;
  }
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Dashboard = () => {
  const [unitSystem, setUnitSystem] = useState(`metric`)
  const [weatherData, setWeatherData] = useState({ cityName: `` })
  const [query, setQuery] = useState(``)
  const [search, setSearch] = useState(`London`)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log(`env`, DEVELOP_WITH_MOCK_DATA)
    if (DEVELOP_WITH_MOCK_DATA) {
      const { current, daily, hourly } = mockWeatherData
      setWeatherData({
        cityName: search,
        current: current,
        daily: daily,
        hourly: hourly,
      })
      setIsLoading(false)
    } else {
      const geocodingUrl = buildGeocodingUrl(search, unitSystem)
      console.log(`Loading Geo Data Once.......`)
      setIsLoading(true)
      axios.get(geocodingUrl).then((response) => {
        const { data } = response

        if (data.length === 0) {
          setIsError(true)
          setIsLoading(false)
          return 0
        }
        const { lat, lon } = data[0]
        console.log(`Loading Weather Data Once.......`)
        const sevenDayUrl = buildSevenDayUrl(lat, lon, unitSystem)
        return axios
          .get(sevenDayUrl)
          .then((response) => {
            const { current, daily, hourly } = response.data

            setWeatherData({
              cityName: search,
              current: current,
              daily: daily,
              hourly: hourly,
            })
          })
          .then(() => {
            setIsError(false)
            setIsLoading(false)
          })
      })
    }
  }, [search, unitSystem])

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
        <NotificationPopUp>
          <div>Invalid city, please try again.</div>
        </NotificationPopUp>
      )}

      {isLoading || isError ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div>
          <CurrentWeather
            cityName={search}
            dailyForecast={weatherData.daily}
            unitSystem={unitSystem}
          />
          <HourlyForecast
            hourlyForecast={weatherData.hourly}
            unitSystem={unitSystem}
          />
          <GlobalStatistics global={weatherData.current} />
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
