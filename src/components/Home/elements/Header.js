import styled from "styled-components";

import { colors } from "../../styles/variables";

const Header = styled.header`
  background: ${colors.blue3};
  border-radius: 2px 2px 0 0;
  height: 50px;
  line-height: 50px;

  img {
    display: inline-block;
    vertical-align: middle;
    padding: 0 15px;
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

export default Header;
