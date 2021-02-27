import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

const Layout = styled.div`
  height: 70%;
  flex-grow: 1;
  margin: 0 32px;
`

const FormInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
  background-color: white;
  padding-left: 12px;
  font-size: 24px;
  color: black;
  &:hover {
    background-color: lightgray;
    color: black;
    font-size: 24px;
    &::placeholder {
      color: gray;
      font-size: 16px;
    }
  }
  &::placeholder {
    color: gray;
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
        placeholder="Please enter a town or city"
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
