import React from 'react';

interface Props {
  element: any;
  mediaMetadata: MediaMetadata;
  //@ts-ignore
  controls?: { [action]: (() => void) | null };
}

export default ({
  element,
  mediaMetadata: { title, album, artist, artwork },
  controls,
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
      //artwork,
    });

    //@ts-ignore
    Object.keys(controls).forEach((e: MediaSessionAction) =>
      navigator.mediaSession.setActionHandler(e, controls[e])
    );
  }, [element]);
  return;
};
