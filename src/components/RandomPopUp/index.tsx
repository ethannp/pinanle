import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { theme } from "../../constants";
import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
  mode: string;
}

export function RandomPopUp({ onClose, mode }: Props) {
  const curTmrwMode = localStorage.getItem("tomorrowsMode") || "classic";
  const [tmrwMode, setTmrwMode] = React.useState<string>(curTmrwMode);

  const handleSelectMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("tomorrowsMode", event.target.value);
    setTmrwMode(event.target.value);
  };

  return (
    <Styled.Container>
      <Styled.PopUp>
        <div style={{ position: "relative", width: "100%" }}>
          <IoCloseCircleOutline
            size={40}
            color={theme.red}
            style={{
              position: "absolute",
              top: "-10",
              right: "-10",
              cursor: "pointer",
            }}
            onClick={onClose}
          ></IoCloseCircleOutline>
        </div>
        <h1 style={{ textAlign: "center" }}>Random Mode</h1>
        <Styled.Spacer />
        <Styled.Section>
          <p>
            Random Mode is a different way to play Pinanle - instead of starting at
            the beginning of the piece (classic), a random starting time in the
            piece will be chosen. Everyone has the same random starting time.
          </p>
        </Styled.Section>
        <Styled.Section>
          <p>
            Changes will apply to tomorrow&apos;s Pinanle. Today&apos;s Pinanle
            is still <b>{mode.charAt(0).toUpperCase() + mode.slice(1)} mode</b>.
          </p>
        </Styled.Section>
        <Styled.Spacer />
        <h3 style={{ marginTop: "5px" }}>Set Mode</h3>
        <Styled.Section>
          <input
            type="radio"
            value="classic"
            id="classic"
            name="modeOption"
            onChange={handleSelectMode}
            checked={tmrwMode == "classic"}
          />
          <label htmlFor="classic">
            <Styled.Option>🏛️ Classic</Styled.Option>
          </label>

          <input
            type="radio"
            value="random"
            id="random"
            name="modeOption"
            onChange={handleSelectMode}
            checked={tmrwMode == "random"}
          />
          <label htmlFor="random">
            <Styled.Option>🎲 Random</Styled.Option>
          </label>
        </Styled.Section>
      </Styled.PopUp>
    </Styled.Container>
  );
}
