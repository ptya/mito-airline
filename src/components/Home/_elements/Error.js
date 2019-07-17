import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";
import { buzz } from "components/_styles/InputField";

import warning from "assets/images/error.svg";

const StyledError = styled.div`
  position: absolute;
  bottom: -15px;
  font-size: 10px;
  line-height: 10px;
  right: 0;
  color: ${colors.pink};
  display: flex;
  animation: ${buzz} 0.3s ease-in-out;

  img {
    width: 12px;
    height: 12px;
  }
  span {
    margin: auto 10px;
  }

  @media (min-width: ${breakPoints[0]}) {
    bottom: -32px;
    font-size: 13px;
    line-height: 13px;

    img {
      width: 17px;
      height: 17px;
    }
  }
`;

const Error = props => (
  <StyledError data-testid="error">
    <img src={warning} alt="error" />
    <span>{props.message}</span>
  </StyledError>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
