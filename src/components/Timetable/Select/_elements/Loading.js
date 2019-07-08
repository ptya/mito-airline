import React from "react";

// global elements
import { Spinner } from "components/_elements/Spinner";

// local styles
import GeneralWrapper from "../_styles/GeneralWrapper";

const Loading = () => (
  <GeneralWrapper>
    <Spinner width={50} />
  </GeneralWrapper>
);

export default Loading;
