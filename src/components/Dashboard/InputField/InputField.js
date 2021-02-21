import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  height: 50px;
`

const FormInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
  background-color: rgb(50, 61, 105);
  padding-left: 12px;
  font-size: 16px;
  color: white;
  &:hover {
    background-color: white;
    color: black;
    &::placeholder {
      color: black;
    }
  }
  &::placeholder {
    color: white;
    font-size: 16px;
  }
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InputField = ({ onChange, onKeyUp, value }) => {
  return (
    <Layout>
      <FormInput
        type="text"
        placeholder="Please enter a location"
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />
    </Layout>
  )
}

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default InputField
