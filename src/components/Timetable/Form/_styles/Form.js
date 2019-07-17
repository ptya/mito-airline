import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  justify-content: center;
  padding: 10px;

  fieldset {
    display: contents;
  }

  @media (min-width: ${breakPoints[0]}) {
    flex-direction: row;
    padding: 33px 0 53px;
  }
`;

export default Form;
