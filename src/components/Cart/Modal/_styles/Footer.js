import styled from "styled-components";

import { colors } from "components/_styles/variables";

const Footer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  h2 {
    padding: 15px 30px;
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
    color: ${colors.grey6};

    span {
      font-weight: bold;
      color: ${colors.blue3};
    }
  }
`;

export default Footer;
