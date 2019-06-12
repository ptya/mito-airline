import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
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
