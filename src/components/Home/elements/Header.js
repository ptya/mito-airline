import React from "react";
import styled from "styled-components";

import { colors } from "../../styles/variables";

import logo from "../../../assets/images/mito-logo.svg";

const StyledHeader = styled.header`
  background: ${colors.blue3};
  border-radius: 2px 2px 0 0;
  height: 50px;
  line-height: 50px;

  img {
    display: inline-block;
    vertical-align: middle;
    padding: 0 15px;
    transform: rotateX(0);
    transition: transform 0.5s ease-in-out;
  }

  img:hover {
    transform: rotate(360deg);
  }

  h1 {
    color: ${colors.white};
    display: inline-block;
    font-size: 17px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
`;

const Header = () => (
  <StyledHeader>
    <img src={logo} alt="Mito Airline" />
    <h1>Mito Airline</h1>
  </StyledHeader>
);

export default Header;
