import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import HourlyItem from "./HourlyItem"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  background-color: white;
  color: black;
`

const HourlyItems = styled.ul`
  width: 1024px;
  margin: 0 auto;
  height: 100%;
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid lightgray;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HourlyForecast = ({ hourlyForecast, unitSystem }) => {
  const hourlyItems = hourlyForecast
    .slice(0, 13)
    .map((hour) => (
      <HourlyItem key={hour.dt} hour={hour} unitSystem={unitSystem} />
    ))

  return (
    <Layout>
      <HourlyItems>{hourlyItems}</HourlyItems>
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
