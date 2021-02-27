import React from "react"
import styled from "styled-components"
import InputField from "./InputField"

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const setUnitsCopy = (unitSystem) => {
  if (unitSystem === `metric`) {
    return `Switch to Fahrenheit`
  } else {
    return `Switch to Celsius`
  }
}
// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.p`
  font-size: 36px;
  flex-grow: 0;
`

const UnitSystemButton = styled.button`
  height: 50%;
  flex-grow: 0;
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Header = ({ unitSystem, setUnitSystem, query, setQuery, setSearch }) => {
  const buttonText = setUnitsCopy(unitSystem)
  return (
    <Layout>
      <Logo>The Weather App</Logo>

      <InputField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === `Enter`) {
            setSearch(query)
          }
        }}
      />

      <UnitSystemButton
        onClick={() =>
          setUnitSystem(unitSystem === `metric` ? `imperial` : `metric`)
        }
      >
        {buttonText}
      </UnitSystemButton>
    </Layout>
  )
}

export default Header
