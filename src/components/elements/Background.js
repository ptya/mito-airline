import styled from "styled-components";
import { grey2 } from "../styles/variables";

import img from "../../assets/images/background.svg";

const Background = styled.div`
  background: ${grey2};
  background-image: url(${img});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right bottom;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -999;
`;

export default Background;
