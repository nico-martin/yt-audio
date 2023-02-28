import React from 'react';

interface Props {
  element: any;
  mediaMetadata: MediaMetadata;
  //@ts-ignore
  controls?: { [action]: (() => void) | null };
  positionState: MediaPositionState;
}

export default ({
  element,
  mediaMetadata: { title, album, artist, artwork },
  controls,
  positionState,
}: Props) => {
  if (!('mediaSession' in navigator)) {
    return;
  }

  React.useEffect(() => {
    if (!element) {
      return;
    }

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
  }, [element]);

  React.useEffect(() => {
    navigator.mediaSession.setPositionState(positionState);
  }, [positionState]);

  return;
};
