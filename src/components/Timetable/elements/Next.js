import styled from "styled-components";

import Previous from "./Previous";

const Next = styled(Previous)`
  button {
    flex-direction: row-reverse;
    align-content: flex-start;
    margin-left: auto;
  }

  img {
    margin-left: 8px;
    margin-right: 0;
    transform: rotate(180deg);
  }
`;

export default Next;
