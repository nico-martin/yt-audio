import React, { useEffect, useRef, useState } from 'react';
import { Audio } from '../../vendor/types';
import { HTMLAudioState, HTMLAudioControls } from '../types';

interface Props {
  audio: {
    state: HTMLAudioState;
    controls: HTMLAudioControls;
    element: HTMLAudioElement | null | any;
  };
  source: Audio;
}

export default ({ audio, source }: Props) => {
  if (!('mediaSession' in navigator)) {
    return;
  }

  const updatePositionState = () => {
    if (
      'mediaSession' in navigator &&
      'setPositionState' in navigator.mediaSession
    ) {
      // @ts-ignore
      navigator.mediaSession.setPositionState({
        duration: audio.state.duration,
        playbackRate: audio.state.playbackRate,
        position: audio.state.time,
      });
    }
  };

  useEffect(() => {
    // Media Session API
    if (!audio.element || !('mediaSession' in navigator)) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: source.title,
      artist: source.author,
      album: 'YouTube Audio Player',
      artwork: source.images.map(e => {
        return {
          src: e.url,
          height: e.height,
          width: e.width,
        };
      }),
    });

    updatePositionState();

    const controls = {
      play: audio.controls.play,
      pause: audio.controls.pause,
      seekbackward: () => {
        audio.controls.seek(audio.state.time - 30);
        updatePositionState();
      },
      seekforward: () => {
        audio.controls.seek(audio.state.time + 30);
        updatePositionState();
      },
      // @ts-ignore => https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44231
      seekto: details => {
        audio.controls.seek(details.seekTime);
        updatePositionState();
      },
    };
    Object.keys(controls).forEach((e: MediaSessionAction) =>
      navigator.mediaSession.setActionHandler(e, controls[e])
    );
  }, [audio.element]);

  useEffect(() => {
    updatePositionState();
  }, [audio.state.playbackRate]);

  return;
};
