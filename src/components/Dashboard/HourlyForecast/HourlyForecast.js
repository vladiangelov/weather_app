import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  background-color: white;
  color: black;
  padding: 0px 16px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const HourlyItem = ({ hour }) => {
  const dateInstance = new Date(hour.dt * 1000)
  const formattedTime = dateInstance.getHours()

  return (
    <li>
      <p>{formattedTime}:00</p>
      <p>{hour.temp}°</p>
    </li>
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
// Check the API fetching!
const HourlyForecast = ({ hourlyForecast }) => {
  const hourlyItems = hourlyForecast
    .slice(0, 10)
    .map((hour) => <HourlyItem key={hour.dt} hour={hour} />)

  return (
    <Layout>
      <ul>{hourlyItems}</ul>
    </Layout>
  )
}

HourlyForecast.defaultProps = {
  hourlyForecast: [],
}

HourlyForecast.propTypes = {
  hourlyForecast: PropTypes.array,
}

export default HourlyForecast
