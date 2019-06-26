import styled from "styled-components";

import { colors } from "components/styles/variables";

const Header = styled.h2`
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;

  span {
    color: ${colors.blue3};
  }
`;

export default Header;
