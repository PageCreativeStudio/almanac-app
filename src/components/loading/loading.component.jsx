import React from "react";
import FadingDots from "react-cssfx-loading/lib/FadingDots";
import { Wrapper } from "./loading.styles";

const Loading = () => (
  <Wrapper alignItems="center" justifyContent="center">
    <FadingDots color="#e23734" width="8rem" height="8rem"  />
  </Wrapper>
)

export default Loading