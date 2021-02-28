import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import DailyItem from "./DailyItem"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const returnBorderColor = (minMaxTemp, mainTemp, active) => {
  const minTemp = minMaxTemp[0]
  const maxTemp = minMaxTemp[1]
  const range = maxTemp - minTemp
  const increment = range / 4

  console.log(`inc`, increment)

  let color = ``

  if (mainTemp < minTemp + increment) {
    color = `rgb(174, 220, 216)`
  } else if (mainTemp < minTemp + increment) {
    color = `rgb(208, 215, 62)`
  } else if (
    mainTemp > minTemp + increment &&
    mainTemp < minTemp + 2 * increment
  ) {
    color = `rgb(254,219,1)`
  } else if (
    mainTemp > minTemp + 2 * increment &&
    mainTemp < minTemp + 3 * increment
  ) {
    color = `rgb(252,180,14)`
  } else {
    color = `rgb(252,128,14)`
  }

  if (active) {
    return `width: 250px; height: 120px;
            border-top: 10px ${color} solid;
            border-bottom: 10px transparent solid;

            &:hover {
              border-top: 10px ${color} solid;
              border-bottom: 10px transparent solid;
            }`
  }

  return `border-top: 10px transparent solid;
          border-bottom: 10px ${color} solid;

          &:hover {
            border-top: 10px ${color} solid;
            border-bottom: 10px transparent solid;
          }`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  color: black;
  padding: 0px 16px;
  max-width: 1024px;
  margin: 0 auto;
  height: 100px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`

const StyledDailyItem = styled(DailyItem)`
  min-height: 80px;
  flex-grow: 1;
  background-color: white;
  padding: 6px 10px;
  cursor: pointer;
  border-left: 1px solid lightgray;
  ${({ minMaxTemp, mainTemp, active }) =>
    returnBorderColor(minMaxTemp, mainTemp, active)}
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DailyForecast = ({
  dailyForecast,
  setImageSlug,
  minMaxTemp,
  unitSystem,
}) => {
  const todayTimestamp = dailyForecast[0].dt
  const [active, setActive] = useState(todayTimestamp)

  const dailyItems = dailyForecast.map((day) => {
    let activeDay = false
    if (day.dt === active) {
      activeDay = true
    }
    return (
      <StyledDailyItem
        key={day.dt}
        day={day}
        active={activeDay}
        setActive={setActive}
        setImageSlug={setImageSlug}
        minMaxTemp={minMaxTemp}
        mainTemp={day.temp.day}
        unitSystem={unitSystem}
      />
    )
  })

  return (
    <Layout>
      <ul>{dailyItems}</ul>
    </Layout>
  )
}

DailyForecast.defaultProps = {
  dailyForecast: [],
}

DailyForecast.propTypes = {
  dailyForecast: PropTypes.array,
}

export default DailyForecast
