import React from "react"
import styled from "styled-components"

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
  padding: 12px 0;
  background-color: white;
  color: black;
  height: 150px;
`

const InnerContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
`

const UvIndexTriangle = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid ${({ uvIndex }) => setUvColor(uvIndex)};
`
const UvIndex = styled.div`
  position: absolute;
  top: 22px;
  left: -10px;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GlobalStatistics = ({ global }) => {
  return (
    <Layout>
      <InnerContainer>
        <div>
          <div>UV Index: </div>
          <UvIndexTriangle uvIndex={global.uvi}>
            <UvIndex>{global.uvi}</UvIndex>
          </UvIndexTriangle>
        </div>
        <div>
          Sunrise: {global.sunrise} Sunset: {global.sunset}
        </div>
      </InnerContainer>
    </Layout>
  )
}

export default GlobalStatistics
