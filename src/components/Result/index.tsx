import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";

import { Button } from "../Button";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";
import { theme } from "../../constants";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
}: Props) {

  const calculateTimeLeft = () => { return Math.floor(
    (new Date(new Date().setHours(24, 0, 0, 0)).getTime() -
      new Date().getTime()) / 1000
  )}
  
  const [isCopied, setIsCopied] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    });
  const textForTry = ["Pinanle god!", "Too hot to Handel!", "W moment", "FOURty hours practiced!", "⭐🎹⭐", "Close one!"];

  const copyResult = React.useCallback(() => {
    navigator.clipboard.writeText(scoreToEmoji(guesses));
    setIsCopied(true);
  }, [guesses]);
  return (
    <>
      {didGuess ? ( 
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
      ) : (
        <Styled.ResultTitle>Need to practice more?</Styled.ResultTitle>
      )}
      <Styled.SongTitle>
        Today&apos;s piece was {todaysSolution.artist} -{" "}
        {todaysSolution.name}
      </Styled.SongTitle>
      {didGuess ? (
        <Styled.Tries>
          You got today&apos;s Pinanle in {currentTry} {currentTry === 1 ? 'try!' : 'tries!'}
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
          style={(guess.skipped || guess.isCorrect == undefined) ? 
            {backgroundColor: theme.gray} : 
            (guess.isCorrect ? {backgroundColor: "#00ab1c"} : {backgroundColor: "#ba0000"})}></Styled.ResultColorBox>
      ))}
      </Styled.ResultsColorContainer>
      <YouTube id={todaysSolution.youtubeId} />
      <Button onClick={copyResult} variant="blue">
        Copy results
      </Button>
      {isCopied && <Styled.Text>Copied to clipboard!</Styled.Text>}
      <Styled.TimeToNext>
        Come Bach in:
        <p style={{fontSize: 24, marginTop: 0}}>{Math.floor(timeLeft / 60 / 60)}:{("0"+Math.floor(timeLeft / 60 % 60)).slice(-2)}:{("0"+Math.floor(timeLeft % 60)).slice(-2)}</p>
      </Styled.TimeToNext>
    </>
  );
}

