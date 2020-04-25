import React, { useEffect, useRef, useState } from 'react';
import { HTMLAudioState, HTMLAudioControls, HTMLAudioProps } from '../types';

/**
 * Shout-out to:
 * https://github.com/streamich/react-use/blob/master/src/util/createHTMLMediaHook.ts
 *💐 💪
 */

export const states = {};

const parseTimeRange = ranges =>
  ranges.length < 1
    ? {
        start: 0,
        end: 0,
      }
    : {
        start: ranges.start(0),
        end: ranges.end(0),
      };

export default ({
  src,
  autoPlay = false,
  startPlaybackRate = 1,
  formats = [],
  setError = error => console.log(error),
}: HTMLAudioProps) => {
  const [state, setOrgState] = useState<HTMLAudioState>({
    buffered: {
      start: 0,
      end: 0,
    },
    time: 0,
    duration: 0,
    paused: true,
    waiting: false,
    playbackRate: 1,
    endedCallback: null,
  });
  const setState = (partState: Partial<HTMLAudioState>) =>
    setOrgState({ ...state, ...partState });
  const ref = useRef<HTMLAudioElement | null>(null);

  const element = React.createElement(
    'audio',
    {
      ...(formats.length === 0 ? { src } : {}),
      controls: false,
      ref,
      onPlay: () => setState({ paused: false }),
      onPause: () => setState({ paused: true }),
      onWaiting: () => setState({ waiting: true }),
      onPlaying: () => setState({ waiting: false }),
      onEnded: state.endedCallback,
      onDurationChange: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        const { duration, buffered } = el;
        setState({
          duration,
          buffered: parseTimeRange(buffered),
        });
      },
      onTimeUpdate: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ time: el.currentTime });
      },
      onProgress: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ buffered: parseTimeRange(el.buffered) });
      },
      onRateChange: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ playbackRate: el.playbackRate });
      },
      onError: () => setError('There was an error playing the audio file'),
    } as any,
    formats.map(({ mimeType, src }) => [
      React.createElement('source', {
        mime: mimeType,
        src,
        onError: () => setError('There was an error loading the audio file'),
      }),
    ])
  );

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay: boolean = false;

  const controls: HTMLAudioControls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === 'object';

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
    },
    seek: (time: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      time = Math.min(state.duration, Math.max(0, time));
      el.currentTime = time || 0;
    },
    setPlaybackRate: (rate: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }

      setState({
        playbackRate: rate,
      });
      el.playbackRate = rate;
    },
    setEndedCallback: (callback: Function) => {
      setState({ endedCallback: callback });
    },
  };

  useEffect(() => {
    const el = ref.current!;
    setState({
      paused: el.paused,
    });

    controls.setPlaybackRate(startPlaybackRate);

    // Start media, if autoPlay requested.
    if (autoPlay && el.paused) {
      controls.play();
    }
  }, [src]);

  return { state, element, controls };
};
