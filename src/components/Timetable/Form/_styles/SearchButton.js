import styled from "styled-components";

import Button from "components/_styles/Button";

import { breakPoints } from "components/_styles/variables";

const SearchButton = styled(Button)`
  margin: 10px 0 0;
  width: unset;

  @media (min-width: ${breakPoints[0]}) {
    margin: 0 7px;
    width: 230px;
  }
`;

export default SearchButton;
