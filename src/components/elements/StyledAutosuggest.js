import styled from "styled-components";

import { colors, zIndex } from "components/styles/variables";

const StyledAutosuggest = styled.div`
  .react-autosuggest__input {
    padding: 25px 15px 8px;
  }

  .react-autosuggest__suggestions-container {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: ${zIndex.higher};
    background: ${colors.white};
    width: 90%;
    border-radius: 3px;
  }

  .react-autosuggest__suggestions-container--open {
    border: 1px solid ${colors.grey5};
    box-shadow: 1px 1px 2px ${colors.grey4};
    max-height: 240px;
    overflow-y: auto;
  }

  .react-autosuggest__suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .react-autosuggest__suggestion {
    padding: 10px;
    height: 40px;
    cursor: pointer;
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${colors.pink};
    color: ${colors.white};
  }
`;

export default StyledAutosuggest;
