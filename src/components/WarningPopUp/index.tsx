import React from "react";
import { IoCloseCircleOutline, IoLogoGithub } from "react-icons/io5"
import { theme, startDate } from "../../constants";
import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
}

export function WarningPopUp({ onClose }: Props) {

  const msInDay = 86400000;
  const todaysDate = new Date();
  const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay) + 1 
  const hrefText = `mailto: fluff.fflff+Pianle@gmail.com?subject=Pinanle #${index} Bug&body=Device Information: ${navigator.userAgent}`

  return (
    <Styled.Container>
      <Styled.PopUp>
      <div style={{position: "relative", width: "100%"}}>
      <IoCloseCircleOutline size={40} color={theme.red} style={{position:"absolute", top:"-10", right: "-10", cursor: "pointer"}} onClick={onClose} ></IoCloseCircleOutline>
      </div>
        <h1 style={{textAlign:"center"}}>Found an Issue?</h1>
        <Styled.Spacer />
        <Styled.Section>
          <p>
          <a href={hrefText} target="_blank" rel="noreferrer">Click here</a> to send me an email and let me know!
            Alternatively, contact me on Discord at <code style={{fontSize:"16px"}}>fluff#2368</code>.
          </p>
        </Styled.Section>
        <Styled.Section>
          <p>
            When the page is loaded, the video will unmute itself and set its volume to 80%. All pieces <i>should</i> start within 3 seconds. 
          </p>
        </Styled.Section>
        <Styled.Section>
          <p>
            Today is Pinanle #{index}.
          </p>
        </Styled.Section>
        <a href="https://github.com/ethannp/pinanle" target="_blank" rel="noreferrer">
          <IoLogoGithub size={30} color="white"/>
        </a>
      </Styled.PopUp>
    </Styled.Container>
  );
}
