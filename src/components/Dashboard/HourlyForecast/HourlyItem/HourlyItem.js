import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import humidity from "../../../../content/images/daily_item/humidity.png"
import wind from "../../../../content/images/daily_item/wind.png"
import tempFormatCelsius from "../../../../helpers/tempFormatCelsius"
import tempFormatFahrenheit from "../../../../helpers/tempFormatFahrenheit"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const buildIconUrl = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}.png`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid lightgray;
  flex-grow: 1;
  padding: 4px;
  height: 400px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const WindSpeed = styled.div`
  height: 24px;
  width: 24px;
  border: 1px black solid;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  background-color: white;
`

const WindSpeedDirection = styled.div`
  width: 0px;
  height: 0px;
  border: solid black;
  border-width: 0 6px 6px 0;
  padding: 3px;
  margin: 10px;
  ${({ windDeg }) => `transform: rotate(${windDeg}deg)`}
`
const Wind = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  height: 20px;
  padding-bottom: 2px;
`

const Humidity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ForecastImage = styled.img`
  object-fit: none;
`

const ImageAndTemperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HourlyItem = ({ hour, unitSystem }) => {
  const dateInstance = new Date(hour.dt * 1000)
  const formattedTime = dateInstance.getHours()

  return (
    <Layout>
      <p>
        <strong>{formattedTime}</strong>00
      </p>
      <ImageAndTemperature>
        <ForecastImage src={buildIconUrl(hour.weather[0].icon)} alt="icon" />
        <div>
          <strong>
            {unitSystem === `metric`
              ? tempFormatCelsius(hour.temp)
              : tempFormatFahrenheit(hour.temp)}
          </strong>
        </div>
      </ImageAndTemperature>
      <Humidity>
        <Image src={humidity} alt="humidity" />
        <div>{hour.humidity}</div>
      </Humidity>
      <Wind>
        <Image src={wind} alt="wind" />
        <WindSpeed>{Number(hour.wind_speed.toFixed(0))}</WindSpeed>
        <WindSpeedDirection windDeg={hour.wind_deg} />
      </Wind>
    </Layout>
  )
}

HourlyItem.defaultProps = {
  hour: {},
}

HourlyItem.propTypes = {
  hour: PropTypes.object,
  unitSystem: PropTypes.string.isRequired,
}

export default HourlyItem
