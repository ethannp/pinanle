import React from "react";
import { IoInformationCircleOutline, IoWarningOutline, IoDiceOutline } from "react-icons/io5";

import * as Styled from "./index.styled";

interface Props {
  openInfoPopUp: () => void;
  openWarningPopUp: () => void;
  openRandomPopUp: () => void;
}

export function Header({ openInfoPopUp, openWarningPopUp, openRandomPopUp }: Props) {
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
        <div style={{verticalAlign: "middle", marginLeft: "auto"}}>
          <IoDiceOutline 
            onClick={openRandomPopUp}
            size={30}
            width={30}
            height={30}
            style={{marginRight: "12px"}}
            />
          <IoWarningOutline
            onClick={openWarningPopUp}
            size={30}
            width={30}
            height={30}
          />
        </div>
      </Styled.Content>
    </Styled.Container>
  );
}
