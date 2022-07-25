import React from "react";
import { default as YouTubePlayer } from "react-youtube";

interface Props {
  id: string;
}

export function YouTube({ id }: Props) {
  const playerRef = React.useRef<any>(null);
  const setReady = React.useCallback(() => {
    playerRef.current?.internalPlayer.setVolume(80);
    playerRef.current?.internalPlayer.unMute();
  }, []);

  return (
    <div style={{ margin: "5% 0" }}>
      <YouTubePlayer
        onReady={setReady}
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
