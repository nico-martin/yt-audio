import React from 'react';

interface Props {
  element: HTMLAudioElement;
  mediaMetadata: MediaMetadata;
  //@ts-ignore
  controls?: { [action]: (() => void) | null };
}

export default ({
  element,
  mediaMetadata: { title, album, artist, artwork },
  controls,
}: Props) => {
  React.useEffect(() => {
    if (element && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album,
        artwork: [...artwork],
      });

      //@ts-ignore
      Object.keys(controls).forEach((e: MediaSessionAction) =>
        navigator.mediaSession.setActionHandler(e, controls[e])
      );
    }
  }, [element]);

  React.useEffect(() => {
    if (element && 'mediaSession' in navigator) {
      navigator.mediaSession.setPositionState({
        duration: Math.ceil(element.duration || 0),
        playbackRate: element.playbackRate,
        position: Math.floor(element.currentTime || 0),
      });
    }
  }, [element?.duration, element?.playbackRate, element?.currentTime]);

  return;
};
