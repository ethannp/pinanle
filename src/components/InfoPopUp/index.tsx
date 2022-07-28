import React from "react";
import { Button } from "..";

import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
}

export function InfoPopUp({ onClose }: Props) {
  return (
    <Styled.Container>
      <Styled.PopUp>
        <h1>How to Play</h1>
        <Styled.Spacer />
        <Styled.Section>
          <p>
            Listen to the intro, then find the correct Piano piece{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1kf_UcGDaMiQ4kcOUIpgyvOrfxKT3srEvkHdLJJMDPpI/edit#gid=0"
              target="_blank"
              rel="noreferrer"
            >
              in the list
            </a>
            .
          </p>
        </Styled.Section>
        <Styled.Section>
          <p>Skipped or incorrect attempts unlock more of the piece.</p>
        </Styled.Section>
        <Styled.Section>
          <p>Answer in as few tries as possible and share your score!</p>
        </Styled.Section>
        <Button variant="green" style={{ marginTop: 20 }} onClick={onClose}>
          Play
        </Button>
      </Styled.PopUp>
    </Styled.Container>
  );
}
