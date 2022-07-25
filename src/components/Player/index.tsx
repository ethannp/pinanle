import React from "react";
import YouTube from "react-youtube";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";
import { event } from "react-ga";

import { playTimes } from "../../constants";

import * as Styled from "./index.styled";

interface Props {
  id: string;
  currentTry: number;
}

export function Player({ id, currentTry }: Props) {
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
    if (play) {
      if (currentTime * 1000 >= currentPlayTime) {
        playerRef.current?.internalPlayer.pauseVideo();
        playerRef.current?.internalPlayer.seekTo(0);
        setPlay(false);
      }
    }
  }, [play, currentTime]);

  // don't call play video each time currentTime changes
  const startPlayback = React.useCallback(() => {
    playerRef.current?.internalPlayer
      .getPlayerState()
      .then(function (status: number) {
        if (status == 1) {
          playerRef.current?.internalPlayer.pauseVideo();
          playerRef.current?.internalPlayer.seekTo(0);
          setPlay(false);
        } else {
          setPlay(true);
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
      <YouTube opts={opts} videoId={id} onReady={setReady} ref={playerRef} />
      {isReady ? (
        <>
          <Styled.ProgressBackground>
            <Styled.AvailableBar value={currentPlayTime}></Styled.AvailableBar>
            {currentTime !== 0 && <Styled.Progress value={currentTime} />}
            {playTimes.map((playTime) => (
              <Styled.Separator
                style={{ left: `${(playTime / 16000) * 100}%` }}
                key={playTime}
              />
            ))}
          </Styled.ProgressBackground>
          <Styled.TimeStamps>
            <Styled.TimeStamp>0s</Styled.TimeStamp>
            <Styled.TimeStamp>16s</Styled.TimeStamp>
          </Styled.TimeStamps>
          <Styled.PlayButton>
            {currentTime == 0 && (
              <IoPlayCircleOutline
                size={60}
                color="#fff"
                onClick={startPlayback}
              />
            )}
            {currentTime > 0 && (
              <IoStopCircleOutline
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
