import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Header = styled.h1`
  font-weight: 300;
  font-size: 16px;
  line-height: normal;
  text-transform: uppercase;
  color: ${colors.blue3};
  background: ${colors.grey2};
  margin: 0;
  padding: 15px 30px;
  text-align: center;

  @media (min-width: ${breakPoints[0]}) {
    text-align: unset;
  }
`;

export default Header;
