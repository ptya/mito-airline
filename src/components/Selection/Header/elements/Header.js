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

  ::after {
    content: "";
    width: 100%;
    height: 20px;
    background-image: linear-gradient(${colors.grey2}, ${colors.grey2Opacity});
    position: absolute;
    bottom: -20px;
  }

  .header__route {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 20px;
    margin: 12px 40px;
  }
  .header__info {
    display: block;
    text-transform: uppercase;
    font-size: 10px;
    flex-grow: 1;
  }
  .header__arrows {
    width: 30px;
    margin: auto 0;
  }
`;

export default Header;
