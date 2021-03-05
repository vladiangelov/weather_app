import React from "react"
import styled from "styled-components"
import InputField from "./InputField"

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const setUnitsCopy = (unitSystem) => {
  if (unitSystem === `metric`) {
    return `Celsius`
  } else {
    return `Fahrenheit`
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
  max-width: 1024px;
  margin: 0 auto;
`

const Logo = styled.p`
  font-size: 36px;
  flex-grow: 0;
`

const UnitSystemButton = styled.button`
  height: 65%;
  flex-grow: 0;
  width: 90px;
  background-color: white;
  border-radius: 4px;
  border: 0px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Header = ({ unitSystem, setUnitSystem, query, setQuery, setSearch }) => {
  const buttonText = setUnitsCopy(unitSystem)
  return (
    <Layout>
      <Logo>CS50 Weather App</Logo>

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
        onClick={() => {
          setUnitSystem(unitSystem === `metric` ? `imperial` : `metric`)
        }}
      >
        {buttonText}
      </UnitSystemButton>
    </Layout>
  )
}

export default Header
