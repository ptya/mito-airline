import styled from "styled-components";

import { breakPoints } from "components/_styles/variables";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px;
  align-items: center;
  justify-content: center;

  fieldset {
    display: contents;
  }

  fieldset > div,
  fieldset > button {
    width: 100%;
  }
  fieldset > div {
    margin-bottom: 30px;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  @media (min-width: ${breakPoints[0]}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px 20px;

    fieldset > div,
    fieldset > button {
      margin: 0;
    }

    fieldset > button {
      width: 230px;
    }
  }
`;

export default Form;
