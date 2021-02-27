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
const DailyItem = ({ day }) => {
  const dateInstance = new Date(day.dt * 1000)
  const formattedDate = dateInstance.getDate()
  const formattedMonth = "Feb"

  return (
    <li>
      <p>
        {formattedDate}
        {formattedMonth}
      </p>
      <p>{day.temp.day}°</p>
    </li>
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
// Check the API fetching!
const DailyForecast = ({ dailyForecast }) => {
  const dailyItems = dailyForecast
    .slice(0, 10)
    .map((day) => <DailyItem key={day.dt} day={day} />)

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
