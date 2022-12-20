import React from "react";
import { event } from "react-ga";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

import { playTimes } from "../../constants";

import * as Styled from "./index.styled";

interface Props {
  id: string;
  currentTry: number;
  mode: string;
  error: () => void;
}

export function Player({ id, currentTry, mode, error }: Props) {
  const source =
    "https://raw.githubusercontent.com/flfff/pinanle-storage/main/pieces/" +
    id +
    ".mp3";

  const mp3ref = React.useRef<HTMLAudioElement>(null);

  const currentPlayTime = playTimes[currentTry];

  const [play, setPlay] = React.useState<boolean>(false);

  const [currentTime, setCurrentTime] = React.useState<number>(0);

  const startTimeRef = React.useRef<number>(-1);

  function hash(duration: number): number {
    let hash = 0;
    for (let i = 0, len = id.length; i < len; i++) {
      const chr = id.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return 10 + (Math.abs(hash) % Math.max(duration - 46, 1));
  }

  setTimeout(function () {
    if (mp3ref.current == null) {
      return;
    }
    if (startTimeRef.current == -1) {
      if (mode == "random") {
        startTimeRef.current = hash(mp3ref.current.duration);
        mp3ref.current.currentTime = hash(mp3ref.current.duration);
        mp3ref.current.volume = 1;
        mp3ref.current.pause();
        setPlay(false);
        mp3ref.current.addEventListener("timeupdate", () => {
          if (mp3ref.current == null) {
            return;
          }
          setCurrentTime(mp3ref.current.currentTime);
        });
      } else if (mode == "classic") {
        startTimeRef.current = 0;
        mp3ref.current.volume = 1;
        setPlay(false);
        mp3ref.current.addEventListener("timeupdate", () => {
          if (mp3ref.current == null) {
            return;
          }
          setCurrentTime(mp3ref.current.currentTime);
        });
      } else {
        //console.log("Waiting for valid mode to be passed.")
      }
    }
  }, 200);

  React.useEffect(() => {
    if (mp3ref.current == null) {
      return;
    }
    if (play) {
      if ((currentTime - startTimeRef.current) * 1000 >= currentPlayTime) {
        mp3ref.current.pause();
        mp3ref.current.currentTime = startTimeRef.current;
        setPlay(false);
      }
    }
  }, [play, currentTime]);

  // don't call play video each time currentTime changes
  const startPlayback = React.useCallback(() => {
    if (mp3ref.current == null) {
      return;
    }
    if (mp3ref.current.paused) {
      mp3ref.current.play();
      mp3ref.current.currentTime = startTimeRef.current;
      setPlay(true);
    } else {
      mp3ref.current.pause();
      mp3ref.current.currentTime = startTimeRef.current;
      setPlay(false);
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: "10px" }} />
      <audio src={source} ref={mp3ref} onError={() => error()}></audio>
      <Styled.ProgressBackground>
        <Styled.AvailableBar value={currentPlayTime}></Styled.AvailableBar>
        {play && <Styled.Progress style={{width: (((currentTime - startTimeRef.current) / 16 ) * 100) + "%"}} />}
        {playTimes.map((playTime) => (
          <Styled.Separator
            style={{ left: `${(playTime / 16000) * 100}%` }}
            key={playTime}
          />
        ))}
      </Styled.ProgressBackground>
      <Styled.TimeStamps>
        <Styled.TimeStamp>{mode == "random" ? "?" : "0s"}</Styled.TimeStamp>
        <Styled.TimeStamp>{mode == "random" ? "?" : "16s"}</Styled.TimeStamp>
      </Styled.TimeStamps>
      <Styled.PlayButton>
        {play ? (
          <IoStopCircleOutline size={60} color="#fff" onClick={startPlayback} />
        ) : (
          <IoPlayCircleOutline size={60} color="#fff" onClick={startPlayback} />
        )}
      </Styled.PlayButton>
    </>
  );
}
