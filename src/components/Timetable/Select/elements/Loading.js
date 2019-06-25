import React from "react";

// global elements
import { Spinner } from "components/elements/Spinner";

// local elements
import GeneralWrapper from "./GeneralWrapper";

const Loading = () => (
  <GeneralWrapper>
    <Spinner width={50} />
  </GeneralWrapper>
);

export default Loading;
