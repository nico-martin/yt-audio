import { number } from 'prop-types';

export interface PlayerTypes {
  playing: boolean;
  duration: number;
  time: number;
  speed: number;
}

export interface HTMLAudioState {
  buffered: {
    start: number;
    end: number;
  };
  time: number;
  duration: number;
  paused: boolean;
  waiting: boolean;
  playbackRate: number;
  endedCallback: Function;
}

export interface HTMLAudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  setEndedCallback: (callback: Function) => void;
}

interface HTMLAudioProps {
  src: string;
  autoPlay?: boolean;
  startPlaybackRate?: number;
  formats?: Array<{
    mimeType: string;
    src: string;
  }>;
  setError?: Function;
}
