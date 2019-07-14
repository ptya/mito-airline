import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "components/_styles/variables";

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
    transform: rotateX(0);
    transition: transform 0.5s ease-in-out;
  }

  img:hover {
    transform: rotate(360deg);
  }
`;

const Logo = props => {
  const { to, handler, alt } = props;
  return (
    <StyledLink data-testid="sh-logo" to={to} onClick={() => handler()}>
      <img src={logo} alt={alt} />
    </StyledLink>
  );
};

Logo.propTypes = {
  to: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired
};

export default Logo;
