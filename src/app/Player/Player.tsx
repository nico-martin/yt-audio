import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Audio } from '../vendor/types';
import { videosDB, settingsDB } from '../store';
import PlayerTimeline from './PlayerTimeline';
import PlayerPlaybackSpeed from './PlayerPlaybackSpeed';
import PlayerControls from './PlayerControls';
import PlayerReplay from './PlayerReplay';

import useAudio from './hooks/useAudio';
import useMediaSession from './hooks/useMediaSession';

import './Player.css';

interface Props {
  source: Audio;
  passStartTime: Function;
  setError: Function;
  className?: string;
}

const Player = ({ source, passStartTime, setError, className }: Props) => {
  const audio = useAudio({
    src: `https://yt-source.nico.dev/play/${encodeURIComponent(source.url)}`,
  });
  useMediaSession({
    element: audio.element,
    mediaMetadata: {
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
    },
    controls: {
      play: audio.controls.play,
      pause: audio.controls.pause,
      seekbackward: () => audio.controls.seek(audio.state.time - 30),
      seekforward: () => audio.controls.seek(audio.state.time + 30),
    },
  });

  return (
    <div className={`player ${className}`}>
      {audio.element}
      <div className="player__controls">
        <PlayerPlaybackSpeed
          audioState={audio.state}
          audioControls={audio.controls}
          className="player__speed"
        />
        <PlayerControls
          audioState={audio.state}
          audioControls={audio.controls}
        />
        <PlayerReplay
          audioState={audio.state}
          audioControls={audio.controls}
          className="player__replay"
        />
      </div>
      <PlayerTimeline
        audioState={audio.state}
        audioControls={audio.controls}
        className="player__timeline"
      />
    </div>
  );
};

export default Player;
