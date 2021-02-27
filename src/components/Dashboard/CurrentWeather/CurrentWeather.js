import PropTypes from "prop-types"
import React from "react"

const CurrentWeather = ({ weatherData }) => {
  const { temperature, description } = weatherData

  return (
    <React.Fragment>
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
