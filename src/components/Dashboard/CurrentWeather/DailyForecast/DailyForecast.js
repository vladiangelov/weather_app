import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"

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
    color = `blue`
  } else if (mainTemp < minTemp + increment) {
    color = `green`
  } else if (
    mainTemp > minTemp + increment &&
    mainTemp < minTemp + 2 * increment
  ) {
    color = `yellow`
  } else if (
    mainTemp > minTemp + 2 * increment &&
    mainTemp < minTemp + 3 * increment
  ) {
    color = `orange`
  } else {
    color = `red`
  }

  if (active) {
    return `width: 200px; height: 150px;
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
const DailyItem = ({ day, className, setActive, active, setImageSlug }) => {
  const dateInstance = new Date(day.dt * 1000)
  const formattedDate = dateInstance.getDate()
  const formattedMonth = "Feb"

  return (
    <li
      className={className}
      onClick={() => {
        setActive(day.dt)
        setImageSlug(day.weather[0].main)
      }}
    >
      <div>
        <p>
          {formattedDate}
          {formattedMonth}
        </p>
        <p>{Number(day.temp.day.toFixed(0))}°</p>
      </div>
      {active && <div>{day.weather[0].main}</div>}
    </li>
  )
}

const StyledDailyItem = styled(DailyItem)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  background-color: white;
  padding: 6px 16px;
  cursor: pointer;
  border-left: 1px solid lightgray;
  ${({ minMaxTemp, mainTemp, active }) =>
    returnBorderColor(minMaxTemp, mainTemp, active)}
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DailyForecast = ({ dailyForecast, setImageSlug, minMaxTemp }) => {
  const [active, setActive] = useState(dailyForecast[0].dt)
  const dailyItems = dailyForecast.slice(0, 10).map((day) => {
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
