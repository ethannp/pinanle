import React from "react";

import { GuessType } from "../../types/guess";
import { Song } from "../../types/song";

import { Button, Guess, Player, Search, Result } from "../";

import * as Styled from "./index.styled";

interface Props {
  guesses: GuessType[];
  todaysSolution: Song;
  currentTry: number;
  didGuess: boolean;
  setSelectedSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  skip: () => void;
  guess: () => void;
  mode: string;
}

export function Game({
  guesses,
  todaysSolution,
  currentTry,
  didGuess,
  setSelectedSong,
  skip,
  guess,
  mode,
}: Props) {
  if (didGuess || currentTry === 6) {
    return (
      <Result
        didGuess={didGuess}
        currentTry={currentTry}
        todaysSolution={todaysSolution}
        guesses={guesses}
        mode={mode}
      />
    );
  }
  return (
    <>
      {guesses.map((guess: GuessType, index) => (
        <Guess
          key={index}
          guess={guess}
          isCorrect={guess.isCorrect}
          active={index === currentTry}
        />
      ))}
      <Player
        id={todaysSolution.youtubeId}
        currentTry={currentTry}
        mode={mode}
      />
      <Search currentTry={currentTry} setSelectedSong={setSelectedSong} />
      {currentTry >= 4 && (
        <Styled.Hint>
          Hint: The composer is
          <input type="checkbox" id="toggleSpoiler" />
          <label htmlFor="toggleSpoiler">
            <span>{todaysSolution.artist}</span>
          </label>
        </Styled.Hint>
      )}
      <Styled.Buttons>
        <Button onClick={skip} variant="blue">
          {currentTry === 5 ? "Give Up" : `Skip +${currentTry + 1}s`}
        </Button>
        <Button variant="green" onClick={guess}>
          Submit
        </Button>
      </Styled.Buttons>
    </>
  );
}
