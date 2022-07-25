import React from "react";
import { IoInformationCircleOutline, IoWarningOutline } from "react-icons/io5";

import * as Styled from "./index.styled";

interface Props {
  openInfoPopUp: () => void;
  openWarningPopUp: () => void;
}

export function Header({ openInfoPopUp, openWarningPopUp }: Props) {
  return (
    <Styled.Container>
      <Styled.Content>
        <IoInformationCircleOutline
          onClick={openInfoPopUp}
          size={30}
          width={30}
          height={30}
        />

        <Styled.Logo>Pinanle</Styled.Logo>

        <IoWarningOutline
          onClick={openWarningPopUp}
          size={30}
          width={30}
          height={30}
          style={{verticalAlign: "middle", marginLeft: "auto"}}
        />
      </Styled.Content>
    </Styled.Container>
  );
}
