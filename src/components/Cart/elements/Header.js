import styled from "styled-components";

import { colors, zIndex } from "components/styles/variables";

const Header = styled.h2`
  background: ${colors.white};
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  position: relative;
  z-index: ${zIndex.higher};

  span {
    color: ${colors.blue3};
  }
`;

export default Header;
