import styled from "styled-components";

import { colors } from "../../styles/variables";

const Header = styled.header`
  height: 58px;
  background: ${colors.grey2};
  display: flex;

  h2 {
    font-weight: 500;
    font-size: 18px;
    margin: auto 20px;
    text-transform: uppercase;
    color: ${colors.grey4};
  }

  p {
    margin: auto 20px;
    font-size: 22px;
    font-weight: bold;
    color: ${colors.blue3};
    display: inline-flex;
    text-transform: capitalize;

    img {
      width: 30px;
      margin: auto 20px;
    }
  }
`;

export default Header;
