import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CurrentWeather from "./CurrentWeather"
import Header from "./Header"
import HourlyForecast from "./HourlyForecast"
import InputField from "./InputField"

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

const buildSevenDayUrl = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div``

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({ cityName: `` })
  const [query, setQuery] = useState(``)
  const [search, setSearch] = useState(`London`)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const geocodingUrl = buildGeocodingUrl(search)
    setIsError(false)
    setIsLoading(true)
    axios.get(geocodingUrl).then((response) => {
      const { data } = response

      if (data.length === 0) {
        setIsError(true)
        setIsLoading(false)
        return 0
      }
      const { lat, lon } = data[0]

      const sevenDayUrl = buildSevenDayUrl(lat, lon)

      axios
        .get(sevenDayUrl)
        .then((response) => {
          const { current, daily, hourly } = response.data
          console.log(data)
          setWeatherData({
            cityName: search,
            temperature: current.temp,
            description: current.weather[0].main,
            daily: daily,
            hourly: hourly,
          })
        })
        .then(setIsLoading(false))
    })
  }, [search])

  return (
    <Layout>
      <Header />
      <InputField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === `Enter`) {
            setSearch(query)
          }
        }}
      />

      {isError && <div>Invalid city, please try again.</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <CurrentWeather weatherData={weatherData} />
          <HourlyForecast hourlyForecast={weatherData.hourly} />
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
