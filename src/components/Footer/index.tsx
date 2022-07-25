import React from "react";
import { IoHeart } from "react-icons/io5";

import * as Styled from "./index.styled";

export function Footer() {
  return (
    <span style={{lineHeight:0,marginTop: 1}}>
      <Styled.Text>
        Made with <IoHeart /> by fluff#2368.
      </Styled.Text>
    </span>
  );
}
