import React from "react";
import { default as YouTubePlayer } from "react-youtube";

interface Props {
  id: string;
  mode: string;
  handleError: () => void;
}

export function YouTube({ id, mode, handleError }: Props) {
  function hash(duration: number): number {
    let hash = 0;
    for (let i = 0, len = id.length; i < len; i++) {
      const chr = id.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return 10 + (Math.abs(hash) % Math.max(duration - 46, 1));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = React.useRef<any>(null);
  const setReady = React.useCallback(() => {
    playerRef.current?.internalPlayer.setVolume(80);
    playerRef.current?.internalPlayer.unMute();
    if (mode == "random") {
      playerRef.current?.internalPlayer.getDuration().then((dur: number) => {
        playerRef.current?.internalPlayer.seekTo(hash(dur));
      });
    }
  }, []);

  return (
    <div style={{ margin: "5% 0" }}>
      <YouTubePlayer
        onReady={setReady}
        onError={handleError}
        ref={playerRef}
        videoId={id}
        opts={{
          width: "336",
          height: "189",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
          },
        }}
      />
    </div>
  );
}
