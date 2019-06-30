import styled from "styled-components";

import { colors } from "components/styles/variables";

const Header = styled.h1`
  font-weight: 300;
  font-size: 16px;
  line-height: normal;
  text-transform: uppercase;
  color: ${colors.blue3};
  background: ${colors.grey2};
  margin: 0;
  padding: 15px 30px;
`;

export default Header;
