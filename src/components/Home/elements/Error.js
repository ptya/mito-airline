import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors } from "components/styles/variables";
import { buzz } from "components/styles/InputField";

import warning from "assets/images/error.svg";

const StyledError = styled.div`
  position: absolute;
  bottom: -32px;
  font-size: 13px;
  line-height: 13px;
  color: ${colors.pink};
  display: flex;
  animation: ${buzz} 0.3s ease-in-out;

  img {
    width: 17px;
    height: 17px;
  }
  span {
    margin: auto 10px;
  }
`;

const Error = props => (
  <StyledError>
    <img src={warning} alt="error" />
    <span>{props.message}</span>
  </StyledError>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
