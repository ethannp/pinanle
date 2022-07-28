import { event } from "react-ga";

import React from "react";
import _ from "lodash";

import { Song } from "./types/song";
import { GuessType } from "./types/guess";

import { todaysSolution } from "./helpers";

import {
  Header,
  InfoPopUp,
  WarningPopUp,
  RandomPopUp,
  Game,
} from "./components";

import * as Styled from "./app.styled";

function App() {
  if (localStorage.getItem("tomorrowsMode") === null) {
    localStorage.setItem("tomorrowsMode", "classic");
  }

  const initialGuess = {
    song: undefined,
    skipped: false,
    isCorrect: undefined,
  } as GuessType;

  const [guesses, setGuesses] = React.useState<GuessType[]>(
    Array.from({ length: 6 }).fill(initialGuess) as GuessType[]
  );
  const [currentTry, setCurrentTry] = React.useState<number>(0);
  const [selectedSong, setSelectedSong] = React.useState<Song>();
  const [didGuess, setDidGuess] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<string>("unknown");
  let stats = JSON.parse(localStorage.getItem("stats") || "{}");

  const firstRun = localStorage.getItem("firstRun") === null;
  React.useEffect(() => {
    if (Array.isArray(stats)) {
      const visitedToday = _.isEqual(
        todaysSolution,
        stats[stats.length - 1].solution
      );

      if (!visitedToday) {
        stats.push({
          solution: todaysSolution,
          currentTry: 0,
          didGuess: 0,
          mode: localStorage.getItem("tomorrowsMode") || "classic",
        });
        setMode(stats[stats.length - 1].mode || "classic");
      } else {
        const { currentTry, guesses, didGuess } = stats[stats.length - 1];
        setCurrentTry(currentTry);
        setGuesses(guesses);
        setDidGuess(didGuess);
        if (stats[stats.length - 1].mode == undefined) {
          stats[stats.length - 1].mode = "classic";
        }
        setMode(stats[stats.length - 1].mode || "classic");
      }
    } else {
      // initialize stats
      // useEffect below does rest
      stats = [];
      stats.push({
        solution: todaysSolution,
        mode: localStorage.getItem("tomorrowsMode") || "classic",
      });
      setMode(stats[stats.length - 1].mode || "classic");
    }
  }, []);

  React.useEffect(() => {
    if (Array.isArray(stats)) {
      stats[stats.length - 1].currentTry = currentTry;
      stats[stats.length - 1].didGuess = didGuess;
      stats[stats.length - 1].guesses = guesses;
    }
  }),
    [guesses, currentTry, didGuess];

  React.useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  const [isInfoPopUpOpen, setIsInfoPopUpOpen] =
    React.useState<boolean>(firstRun);

  const openInfoPopUp = React.useCallback(() => {
    setIsInfoPopUpOpen(true);
  }, []);

  const closeInfoPopUp = React.useCallback(() => {
    if (firstRun) {
      localStorage.setItem("firstRun", "false");
      setIsInfoPopUpOpen(false);
    } else {
      setIsInfoPopUpOpen(false);
    }
  }, [localStorage.getItem("firstRun")]);

  const [isWarningPopUpOpen, setIsWarningPopUpOpen] =
    React.useState<boolean>(false);

  const openWarningPopUp = React.useCallback(() => {
    setIsWarningPopUpOpen(true);
  }, []);

  const closeWarningPopUp = React.useCallback(() => {
    setIsWarningPopUpOpen(false);
  }, []);

  const [isRandomPopUpOpen, setIsRandomPopUpOpen] =
    React.useState<boolean>(false);

  const openRandomPopUp = React.useCallback(() => {
    setIsRandomPopUpOpen(true);
  }, []);

  const closeRandomPopUp = React.useCallback(() => {
    setIsRandomPopUpOpen(false);
  }, []);
  const skip = React.useCallback(() => {
    setGuesses((guesses: GuessType[]) => {
      const newGuesses = [...guesses];
      newGuesses[currentTry] = {
        song: undefined,
        skipped: true,
        isCorrect: undefined,
      };

      return newGuesses;
    });

    setCurrentTry((currentTry) => currentTry + 1);

    event({
      category: "Game",
      action: "Skip",
    });
  }, [currentTry]);

  const guess = React.useCallback(() => {
    const isCorrect = selectedSong === todaysSolution;

    if (!selectedSong) {
      alert("Please choose a piece!");
      return;
    }

    setGuesses((guesses: GuessType[]) => {
      const newGuesses = [...guesses];
      newGuesses[currentTry] = {
        song: selectedSong,
        skipped: false,
        isCorrect: isCorrect,
      };

      return newGuesses;
    });

    setCurrentTry((currentTry) => currentTry + 1);
    setSelectedSong(undefined);

    if (isCorrect) {
      setDidGuess(true);
    }

    event({
      category: "Game",
      action: "Guess",
      label: `${selectedSong.artist} - ${selectedSong.name}`,
      value: isCorrect ? 1 : 0,
    });
  }, [guesses, selectedSong]);

  return (
    <main>
      <Header
        openInfoPopUp={openInfoPopUp}
        openWarningPopUp={openWarningPopUp}
        openRandomPopUp={openRandomPopUp}
      />
      {isInfoPopUpOpen && <InfoPopUp onClose={closeInfoPopUp} />}
      {isWarningPopUpOpen && <WarningPopUp onClose={closeWarningPopUp} />}
      {isRandomPopUpOpen && (
        <RandomPopUp onClose={closeRandomPopUp} mode={mode} />
      )}
      <Styled.Container>
        <Game
          guesses={guesses}
          didGuess={didGuess}
          todaysSolution={todaysSolution}
          currentTry={currentTry}
          setSelectedSong={setSelectedSong}
          skip={skip}
          guess={guess}
          mode={mode}
        />
      </Styled.Container>
    </main>
  );
}

export default App;
