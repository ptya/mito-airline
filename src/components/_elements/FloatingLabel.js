import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors, zIndex } from "../_styles/variables";

const StyledLabel = styled.div`
  position: relative;

  label {
    z-index: ${zIndex.high};
    position: absolute;
    top: 0;
    bottom: 0;
    line-height: ${props => (props.isActive ? "30px" : "50px")};
    font-weight: ${props => (props.isActive ? 900 : "normal")};
    font-size: ${props => (props.isActive ? "10px" : "1rem")};
    text-transform: ${props => (props.isActive ? "uppercase" : "capitalize")};
    color: ${colors.grey4};
    padding: ${props => (props.isActive ? "0 15px 10px" : "0 15px")};
    transition: all 0.1s ease-in-out;
    cursor: text;
  }

  .datepicker {
    font-family: Roboto;
    padding: 25px 15px 8px;
  }

  .datepicker__popper {
    z-index: ${zIndex.higher};
  }
`;

const FloatingLabel = props => (
  <StyledLabel {...props}>
    <label htmlFor={props.labelId}>{props.placeholder}</label>
    {props.children}
  </StyledLabel>
);

FloatingLabel.propTypes = {
  labelId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default FloatingLabel;
