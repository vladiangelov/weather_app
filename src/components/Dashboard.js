import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

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

const FormInput = styled.input`
  height: 24px;
`

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
      console.log(data)
      if (data.length === 0) {
        setIsError(true)
        setIsLoading(false)
        return 0
      }
      const { lat, lon } = data[0]

      const sevenDayUrl = buildSevenDayUrl(lat, lon)

      axios.get(sevenDayUrl).then((response) => {
        const { data } = response

        setWeatherData({
          cityName: search,
          temperature: data.current.temp,
          description: data.current.weather[0].main,
        })
        setIsLoading(false)
      })
    })
  }, [search])

  return (
    <Layout>
      <FormInput
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === `Enter`) {
            setSearch(query)
          }
        }}
        placeholder="Please enter a location"
      />

      {isError && <div>Invalid city, please try again.</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <React.Fragment>
          <h1>{weatherData.cityName}</h1>
          <p>{weatherData.temperature} Celsius</p>
          <p>{weatherData.description}</p>
        </React.Fragment>
      )}
    </Layout>
  )
}

export default Dashboard
