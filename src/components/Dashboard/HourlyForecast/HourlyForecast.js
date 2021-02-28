import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

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
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HourlyItemLayout = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
  flex-grow: 1;
  padding: 4px;
  height: 300px;
`

const WindSpeed = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  border: 1px black solid;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  background-color: white;
  margin: 20px;
`

const WindSpeedDirection = styled.div`
  width: 1px;
  height: 30px;
  background: black;
  position: absolute;
  top: 12px;
  left: 12px;
  transform-origin: 100%;
  ${(windDeg) => `transform: rotate(${windDeg})`}
`

const HourlyItem = ({ hour }) => {
  const dateInstance = new Date(hour.dt * 1000)
  const formattedTime = dateInstance.getHours()

  return (
    <HourlyItemLayout>
      <p>
        <strong>{formattedTime}</strong>00
      </p>
      <p>{Number(hour.temp.toFixed(0))}°</p>
      <p>{hour.humidity}</p>
      <WindSpeed>
        {Number(hour.wind_speed.toFixed(0))}
        <WindSpeedDirection windDeg={hour.wind_deg} />
      </WindSpeed>
    </HourlyItemLayout>
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HourlyForecast = ({ hourlyForecast }) => {
  const hourlyItems = hourlyForecast
    .slice(0, 13)
    .map((hour) => <HourlyItem key={hour.dt} hour={hour} />)

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
