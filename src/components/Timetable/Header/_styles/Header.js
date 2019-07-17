import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Header = styled.header`
  height: 58px;
  background: ${colors.grey2};
  display: flex;
  align-items: start;
  max-width: 340px;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-weight: 500;
    font-size: 10px;
    margin: 0 10px;
    text-transform: uppercase;
    color: ${colors.grey4};
  }

  p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: ${colors.blue3};
    display: inline-flex;
    text-transform: capitalize;
    overflow: hidden;
    width: 100%;
    padding: 0 10px;

    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    img {
      width: 15px;
      margin: auto 10px;
    }
  }

  @media (min-width: ${breakPoints[0]}) {
    align-items: center;
    flex-direction: row;
    max-width: unset;
    h2 {
      font-size: 18px;
      margin: auto 20px;
    }

    p {
      margin: auto 20px;
      font-size: 22px;
      padding: unset;
    }

    img {
      width: 30px;
      margin: auto 20px;
    }
  }
`;

export default Header;
