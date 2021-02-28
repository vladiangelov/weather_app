import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import clouds_sun from "../../../content/images/clouds_sun.jpg"
import rain from "../../../content/images/rain.jpg"
import sunny from "../../../content/images/sunny.jpg"
import DailyForecast from "./DailyForecast"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const returnBackgroundImage = (imageSlug) => {
  if (imageSlug === `Clear`) {
    return sunny
  } else if (imageSlug === `Clouds`) {
    return clouds_sun
  } else if (imageSlug === `Rain`) {
    return rain
  }
}

const calculateMinMaxForAllDays = (days) => {
  const tempOnly = days.slice(0, 8).map((day) => day.temp.day)
  return [Math.min(...tempOnly), Math.max(...tempOnly)]
}
// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  height: 252px;
  background-image: url(${(imageSlug) =>
    returnBackgroundImage(imageSlug.imageSlug)});
  background-size: cover;
`

const CityName = styled.div`
  font-size: 36px;
  height: 100px;
  line-height: 100px;
  max-width: 1024px;
  margin: 0 auto;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CurrentWeather = ({ cityName, dailyForecast, unitSystem }) => {
  const [imageSlug, setImageSlug] = useState(dailyForecast[0].weather[0].main)
  const minMaxArray = calculateMinMaxForAllDays(dailyForecast)

  return (
    <Layout imageSlug={imageSlug}>
      <CityName>{cityName}</CityName>
      <DailyForecast
        dailyForecast={dailyForecast}
        setImageSlug={setImageSlug}
        minMaxTemp={minMaxArray}
        unitSystem={unitSystem}
      />
    </Layout>
  )
}

CurrentWeather.defaultProps = {
  weatherData: {},
  dailyForecast: [],
}

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  dailyForecast: PropTypes.arrayOf(Object),
}

export default CurrentWeather
