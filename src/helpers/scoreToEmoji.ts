import { GuessType } from "../types/guess";
import { startDate } from "../constants"

export function scoreToEmoji(guesses: GuessType[]): string {
  const msInDay = 86400000;
  const todaysDate = new Date();
  const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay) + 1 
  const emojis = {
    incorrect: "🥁",
    correct: "🟩",
    skip: "⬛",
    empty: "🎹",
  };
  // const todaysDate = new Date();
  const prefix = `Pinanle #${index}`;

  let scoreEmoji = "";
  let isCorrect = false;
  guesses.forEach((guess: GuessType) => {
    if (guess.isCorrect === true) {
      scoreEmoji += emojis.correct;
      isCorrect = true;
    } else if (guess.skipped === true) {
      scoreEmoji += emojis.skip;
    } else if (guess.isCorrect === false) {
      scoreEmoji += emojis.incorrect;
    } else {
      scoreEmoji += emojis.empty;
    }
  });
  scoreEmoji += "\nhttps://pinanle.live"
  if (isCorrect) {
    scoreEmoji = "\n🔉 " + scoreEmoji;
  } else {
    scoreEmoji = "\n🔇 " + scoreEmoji;
  }
  return `${prefix}${scoreEmoji}`;
}
