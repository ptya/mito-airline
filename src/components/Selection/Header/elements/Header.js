import styled from "styled-components";
import { colors } from "components/styles/variables";

const Header = styled.header`
  background: ${colors.blue3};
  color: ${colors.white};
  z-index: 1;
  position: fixed;
  height: 60px;
  top: 0;
  left: 0;
  right: 0;
  display: flex;

  /* gradient bar underneath header */
  ::after {
    content: "";
    width: 100%;
    height: 20px;
    background-image: linear-gradient(${colors.grey2}, ${colors.grey2Opacity});
    position: absolute;
    bottom: -20px;
  }
`;

export default Header;
