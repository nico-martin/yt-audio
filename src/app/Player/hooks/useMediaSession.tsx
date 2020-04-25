import React, { useEffect, useRef, useState } from 'react';
import { Audio } from '../../vendor/types';
import { HTMLAudioState, HTMLAudioControls } from '../types';

interface Props {
  element: any;
  mediaMetadata: MediaMetadata;
  controls?: { [action in MediaSessionAction]?: (() => void) | null };
}

export default ({
  element,
  mediaMetadata: { title, album, artist, artwork },
  controls,
}: Props) => {
  if (!('mediaSession' in navigator)) {
    return;
  }

  useEffect(() => {
    if (!element) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album,
      artwork,
    });

    Object.keys(controls).forEach((e: MediaSessionAction) =>
      navigator.mediaSession.setActionHandler(e, controls[e])
    );
  }, [element]);
  return;
};
