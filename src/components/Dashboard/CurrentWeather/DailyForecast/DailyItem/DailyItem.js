import React from "react"
import styled from "styled-components"
import tempFormatCelsius from "../../../../../helpers/tempFormatCelsius"
import tempFormatFahrenheit from "../../../../../helpers/tempFormatFahrenheit"

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const MONTHS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const formattedDate = (dt) => {
  const dateInstance = new Date(dt * 1000)
  const formattedDate = dateInstance.getDate()
  const formattedMonth = MONTHS[dateInstance.getDay()]
  return `${formattedMonth} ${formattedDate} `
}

const capitalised = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const buildIconUrl = (icon) => {
  console.log(`icon`, icon)
  return `http://openweathermap.org/img/wn/${icon}.png`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const ActiveDay = styled.div`
  height: 100px;
  width: 50%;
  border-left: 1px solid black;
  padding: 0px 0px 0px 20px;
  display: flex;
  align-items: center;
`

const IconAndTemperature = styled.div`
  display: flex;
  justify-content: space-between;
`

const MinMaxTemp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Image = styled.img`
  object-fit: none;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DailyItem = ({
  day,
  className,
  setActive,
  active,
  setImageSlug,
  unitSystem,
}) => {
  return (
    <li
      className={className}
      onClick={() => {
        setActive(day.dt)
        setImageSlug(day.weather[0].main)
      }}
    >
      <div>{formattedDate(day.dt)}</div>
      <IconAndTemperature>
        <Image src={buildIconUrl(day.weather[0].icon)} alt="icon" />
        <MinMaxTemp>
          <div>
            <strong>
              {unitSystem === `metric`
                ? tempFormatCelsius(day.temp.max)
                : tempFormatFahrenheit(day.temp.max)}
            </strong>
          </div>
          <div>
            {unitSystem === `metric`
              ? tempFormatCelsius(day.temp.min)
              : tempFormatFahrenheit(day.temp.min)}
          </div>
        </MinMaxTemp>
        {active && (
          <ActiveDay>{capitalised(day.weather[0].description)}</ActiveDay>
        )}
      </IconAndTemperature>
    </li>
  )
}

export default DailyItem
