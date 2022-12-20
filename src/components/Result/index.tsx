import React from "react";

import { scoreToEmoji } from "../../helpers";
import { GuessType } from "../../types/guess";
import { Song } from "../../types/song";

import { Button } from "../Button";
import { YouTube } from "../YouTube";

import { theme } from "../../constants";
import * as Styled from "./index.styled";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
  mode: string;
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
  mode,
}: Props) {
  const calculateTimeLeft = () => {
    return Math.floor(
      (new Date(new Date().setHours(24, 0, 0, 0)).getTime() -
        new Date().getTime()) /
        1000
    );
  };

  const [isCopied, setIsCopied] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
  const [videoLoads, setVideoLoads] = React.useState(true);
  const mp3ref = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });
  const textForTry = [
    "Pinanle god!",
    "Too hot to Handel!",
    "W moment",
    "FOURty hours practiced!",
    "⭐🎹⭐",
    "Close one!",
  ];

  const copyResult = React.useCallback(() => {
    navigator.clipboard.writeText(scoreToEmoji(guesses, mode));
    setIsCopied(true);
  }, [guesses]);

  const source =
    "https://raw.githubusercontent.com/flfff/pinanle-storage/main/pieces/" +
    todaysSolution.youtubeId +
    ".mp3";

  function hash(duration: number): number {
    let hash = 0;
    for (let i = 0, len = todaysSolution.youtubeId.length; i < len; i++) {
      const chr = todaysSolution.youtubeId.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return 10 + (Math.abs(hash) % Math.max(duration - 46, 1));
  }

  function handleError() {
    if(videoLoads) {
      setVideoLoads(false);
    }
    
  }
  return (
    <>
      {didGuess ? (
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
      ) : (
        <Styled.ResultTitle>Need to practice more?</Styled.ResultTitle>
      )}
      <Styled.SongTitle>
        Today&apos;s piece was {todaysSolution.artist} - {todaysSolution.name}
      </Styled.SongTitle>
      {didGuess ? (
        <Styled.Tries>
          You got today&apos;s Pinanle in {currentTry}{" "}
          {currentTry === 1 ? "try!" : "tries!"}
        </Styled.Tries>
      ) : (
        <Styled.Tries>
          You didn&apos;t get today&apos;s Pinanle. Better luck tomorrow!
        </Styled.Tries>
      )}
      <Styled.ResultsColorContainer>
        {guesses.map((guess: GuessType, index) => (
          <Styled.ResultColorBox
            key={index}
            style={
              guess.skipped || guess.isCorrect == undefined
                ? { backgroundColor: theme.gray }
                : guess.isCorrect
                ? { backgroundColor: "#00ab1c" }
                : { backgroundColor: "#ba0000" }
            }
          ></Styled.ResultColorBox>
        ))}
      </Styled.ResultsColorContainer>
      {videoLoads ? (
        <YouTube
          id={todaysSolution.youtubeId}
          mode={mode}
          handleError={handleError}
        />
      ) : (
        <audio ref={mp3ref} src={source} style={{marginBottom: "30px", marginTop: "20px"}} controls></audio>
      )}

      <Button onClick={copyResult} variant="blue">
        Copy results
      </Button>
      {isCopied && <Styled.Text>Copied to clipboard!</Styled.Text>}
      <Styled.TimeToNext>
        Come Bach in:
        <p style={{ fontSize: 24, marginTop: 0 }}>
          {Math.floor(timeLeft / 60 / 60)}:
          {("0" + Math.floor((timeLeft / 60) % 60)).slice(-2)}:
          {("0" + Math.floor(timeLeft % 60)).slice(-2)}
        </p>
      </Styled.TimeToNext>
    </>
  );
}
