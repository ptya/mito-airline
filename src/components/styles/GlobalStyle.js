import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import { colors } from "../styles/variables";
import img from "../../assets/images/background.svg";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background: ${colors.grey2};
    background-image: url(${img});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: right bottom;
    font-size: 16px;
    /* margin: 0;
    padding: 0; */
    font-family: "Roboto", sans-serif;
  }

  * {
  box-sizing: border-box;
  }
`;

export default GlobalStyle;
