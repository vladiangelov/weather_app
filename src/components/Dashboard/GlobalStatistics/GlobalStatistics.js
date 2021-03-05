import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import sunrise from "../../../content/images/sun_times/sunrise.svg"
import sunset from "../../../content/images/sun_times/sunset.svg"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const setUvColor = (uvIndex) => {
  if (uvIndex <= 2.5) {
    return `green`
  }
  if (uvIndex > 2.5 && uvIndex <= 5.5) {
    return `yellow`
  }
  if (uvIndex > 5.5 && uvIndex <= 7.5) {
    return `orange`
  }
  if (uvIndex > 7.5 && uvIndex <= 10.5) {
    return `red`
  }
  return `violet`
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  background-color: white;
  color: black;
  height: 150px;
  display: flex;
  align-items: center;
`

const InnerContainer = styled.div`
  width: 50%;
  box-sizing: border-box;
  border-top: 1px solid lightgray;
  padding: 24px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0px auto;
`

const UvIndexTriangle = styled.div`
  margin-top: 6px;
  position: relative;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid ${({ uvIndex }) => setUvColor(uvIndex)};
`
const UvIndex = styled.div`
  position: absolute;
  top: 23px;
  left: -6px;
`

const Image = styled.img`
  display: inline-block;
  height: 40px;
`
const SunriseAndSunset = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`

const ImageAndTime = styled.div`
  width: 100px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`
// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GlobalStatistics = ({ global }) => {
  const dateSunrise = new Date(global.sunrise * 1000)
  const dateSunset = new Date(global.sunset * 1000)
  const formattedSunrise = `${dateSunrise.getHours()}:${dateSunrise.getMinutes()}`
  const formattedSunset = `${dateSunset.getHours()}:${dateSunrise.getMinutes()}`

  return (
    <Layout>
      <InnerContainer>
        <div>
          <div>UV Index</div>
          <UvIndexTriangle uvIndex={global.uvi}>
            <UvIndex>{global.uvi.toFixed(0)}</UvIndex>
          </UvIndexTriangle>
        </div>
        <SunriseAndSunset>
          <ImageAndTime>
            <Image src={sunrise} alt="Sunrise time" />
            <strong>{formattedSunrise}</strong>
          </ImageAndTime>
          <ImageAndTime>
            <Image src={sunset} alt="Sunset time" />
            <strong>{formattedSunset}</strong>
          </ImageAndTime>
        </SunriseAndSunset>
      </InnerContainer>
    </Layout>
  )
}

GlobalStatistics.defaultProps = {
  global: {},
}

GlobalStatistics.propTypes = {
  global: PropTypes.object,
}

export default GlobalStatistics
