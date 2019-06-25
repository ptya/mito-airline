import styled from "styled-components";

import { colors } from "components/styles/variables";

const Form = styled.form`
  display: flex;
  background: ${colors.white};
  justify-content: center;
  padding: 33px 0 53px;

  fieldset {
    display: contents;
  }
`;

export default Form;
