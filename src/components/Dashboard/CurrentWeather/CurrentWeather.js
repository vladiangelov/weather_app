import PropTypes from "prop-types"
import React from "react"

const CurrentWeather = ({ weatherData }) => {
  const { cityName, temperature, description } = weatherData

  return (
    <React.Fragment>
      <h1>{cityName}</h1>
      <p>{temperature} Celsius</p>
      <p>{description}</p>
    </React.Fragment>
  )
}

CurrentWeather.defaultProps = {
  weatherData: {},
}

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
}

export default CurrentWeather
