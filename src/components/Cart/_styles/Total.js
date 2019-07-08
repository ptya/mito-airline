import styled from "styled-components";

import { colors } from "components/_styles/variables";

import Header from "./Header";

const Total = styled(Header)`
  font-family: "Source Sans Pro";
  padding: 15px;
  font-size: 16px;
  background: ${colors.blue3};
  color: ${colors.white};

  span {
    color: ${colors.white};
  }
`;

export default Total;
