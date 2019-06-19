import styled from "styled-components";

import { colors } from "../../styles/variables";
import { buzz } from "../../styles/InputField";

const Error = styled.div`
  position: absolute;
  bottom: -32px;
  font-size: 13px;
  line-height: 13px;
  color: ${colors.pink};
  display: flex;
  animation: ${buzz} 0.3s ease-in-out;

  img {
    width: 17px;
    height: 17px;
  }
  span {
    margin: auto 10px;
  }
`;

export default Error;
