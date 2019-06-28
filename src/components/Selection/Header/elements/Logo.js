import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "components/styles/variables";

// assets
import logo from "assets/images/mito-logo.svg";

const StyledLink = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  border: 0;
  background: ${colors.blue3};
  margin: auto 80px auto 20px;
  cursor: pointer;

  img {
    height: 29px;
    width: 28px;
    margin: 0;
  }
`;

const Logo = props => {
  const { to, handler } = props;
  return (
    <StyledLink to={to} onClick={() => handler}>
      <img src={logo} alt="Mito Airline" />
    </StyledLink>
  );
};

Logo.propTypes = {
  to: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
};

export default Logo;
