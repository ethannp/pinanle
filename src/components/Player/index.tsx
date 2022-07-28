import React from "react";
import YouTube from "react-youtube";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";
import { event } from "react-ga";

import { playTimes } from "../../constants";

import * as Styled from "./index.styled";

interface Props {
  id: string;
  currentTry: number;
  mode: string;
}

export function Player({ id, currentTry, mode }: Props) {
  const opts = {
    width: "0",
    height: "0",
  };

  // react-youtube doesn't export types for this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = React.useRef<any>(null);

  const currentPlayTime = playTimes[currentTry];

  const [play, setPlay] = React.useState<boolean>(false);

  const [currentTime, setCurrentTime] = React.useState<number>(0);

  const [isReady, setIsReady] = React.useState<boolean>(false);

  const [startTime, setStartTime] = React.useState<number>(-1);

  const stateRef = React.useRef<number>(-1);

  function hash(duration: number): number {
    let hash = 0;
    for (let i = 0, len = id.length; i < len; i++) {
      const chr = id.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return 10 + (hash % (duration - 46));
  }

  React.useEffect(() => {
    setInterval(() => {
      playerRef.current?.internalPlayer
        .getCurrentTime()
        .then((time: number) => {
          setCurrentTime(time);
        });
    }, 250);
  }, []);

  React.useEffect(() => {
    if (startTime == -1) {
      if (mode == "random") {
        playerRef.current?.internalPlayer
          .getDuration()
          .then((dur: number) => {
            setStartTime(hash(dur));
            stateRef.current = hash(dur)
            playerRef.current?.internalPlayer.seekTo(hash(dur));
            playerRef.current?.internalPlayer.pauseVideo();
            setPlay(false);
          });
      } else if (mode == "classic") {
        setStartTime(0);
        stateRef.current = 0;
      } else {
        console.log("Valid mode not passed.")
      }
    }
  }, [mode])

  React.useEffect(() => {
    if (play) {
      if ((currentTime - startTime) * 1000 >= currentPlayTime) {
        playerRef.current?.internalPlayer.pauseVideo();
        playerRef.current?.internalPlayer.seekTo(stateRef.current);
        setPlay(false);
      }
    }
  }, [play, currentTime]);

  // don't call play video each time currentTime changes
  const startPlayback = React.useCallback(() => {
    playerRef.current?.internalPlayer
      .getPlayerState()
      .then(function (status: number) {
        // -1 = unstarted
        // 0 = ended
        // 1 = playing
        // 2 = paused
        // 3 = buffering
        if (status == 1) { // playing
          playerRef.current?.internalPlayer.pauseVideo();
          playerRef.current?.internalPlayer.seekTo(stateRef.current);
          setPlay(false);
        } else {
          setPlay(true);
          playerRef.current?.internalPlayer.seekTo(stateRef.current);
          playerRef.current?.internalPlayer.playVideo();
          event({
            category: "Player",
            action: "Played song",
          });
        }
      });
  }, []);

  const setReady = React.useCallback(() => {
    setIsReady(true);
    playerRef.current?.internalPlayer.setVolume(80);
    playerRef.current?.internalPlayer.unMute();
  }, []);

  return (
    <>
    <p>{startTime}</p>
    <p>{stateRef.current}</p>
      <YouTube opts={opts} videoId={id} onReady={setReady} ref={playerRef} />
      {isReady ? (
        <>
          <Styled.ProgressBackground>
            <Styled.AvailableBar value={currentPlayTime}></Styled.AvailableBar>
            {play && <Styled.Progress value={currentTime - startTime} />}
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
              <IoStopCircleOutline
                size={60}
                color="#fff"
                onClick={startPlayback}
              />
            ) : (
              <IoPlayCircleOutline
                size={60}
                color="#fff"
                onClick={startPlayback}
              />
            )}
          </Styled.PlayButton>
        </>
      ) : (
        <p>Loading player...</p>
      )}
    </>
  );
}
