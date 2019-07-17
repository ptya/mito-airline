import styled from "styled-components";

import { breakPoints } from "components/_styles/variables";

const ArticleWrapper = styled.article.attrs(props => ({
  size:
    (props.area === "outbound" && "0 20px 20px 20px") ||
    (props.area === "inbound" && "20px") ||
    0
}))`
  grid-area: ${props => props.area};
  margin: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 2px;

  @media (min-width: ${breakPoints[1]}) {
    margin: ${props => props.size};
  }
`;

export default ArticleWrapper;
