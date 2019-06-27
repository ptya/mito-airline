import styled from "styled-components";

const ArticleWrapper = styled.article.attrs(props => ({
  size:
    (props.area === "outbound" && "0 20px 20px 20px") ||
    (props.area === "inbound" && "20px") ||
    0
}))`
  grid-area: ${props => props.area};
  margin: ${props => props.size};
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`;

export default ArticleWrapper;
