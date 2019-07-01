import React from "react";

// global elements
import { Spinner } from "components/elements/Spinner";

// local styles
import GeneralWrapper from "../styles/GeneralWrapper";

const Loading = () => (
  <GeneralWrapper>
    <Spinner width={50} />
  </GeneralWrapper>
);

export default Loading;
