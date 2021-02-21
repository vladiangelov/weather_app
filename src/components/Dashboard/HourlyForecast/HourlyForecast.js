import PropTypes from "prop-types"
import React from "react"

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const HourlyItem = ({ hour }) => {
  const dateInstance = new Date(hour.dt * 1000)
  const formattedTime = dateInstance.getHours()

  return (
    <li>
      <p>{formattedTime}:00</p>
      <p>{hour.temp} degrees</p>
    </li>
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
// Check the API fetching!
const HourlyForecast = ({ hourlyForecast }) => {
  const hourlyItems = hourlyForecast
    .slice(0, 3)
    .map((hour) => <HourlyItem key={hour.dt} hour={hour} />)

  return <ul>{hourlyItems}</ul>
}

HourlyForecast.defaultProps = {
  hourlyForecast: [],
}

HourlyForecast.propTypes = {
  hourlyForecast: PropTypes.array,
}

export default HourlyForecast
