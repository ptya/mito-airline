import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

// styles
import { colors } from "./variables";
import datepickerStyles from "react-datepicker/dist/react-datepicker.css";

// assets
import img from "../../assets/images/background.svg";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${datepickerStyles}

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
