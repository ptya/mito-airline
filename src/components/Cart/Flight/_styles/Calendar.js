import styled from "styled-components";

import { colors } from "components/_styles/variables";

const Calendar = styled.p`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 46px;
  border: 2px solid ${colors.grey8};
  border-radius: 3px;
  margin: 0;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  line-height: 21px;

  span:first-child {
    background: ${colors.grey2};
  }
`;

export default Calendar;
