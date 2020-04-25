import React, { useEffect, useState } from 'react';
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
  setError: Function;
  className?: string;
}

const Player = ({ source, setError, className }: Props) => {
  const [startTime, setStartTime] = useState<number>(0);

  const audio = useAudio({
    src: `https://yt-source.nico.dev/play/${encodeURIComponent(source.url)}`,
    setError,
    formats: Object.keys(source.formats).map(mimeType => {
      return {
        mimeType,
        src: `https://yt-source.nico.dev/play/${encodeURIComponent(
          source.formats[mimeType]
        )}`,
      };
    }),
  });

  useMediaSession({ audio, source });

  useEffect(() => {
    videosDB.get(source.id).then(v => setStartTime(v.time));
    settingsDB
      .get('playbackRate')
      .then(rate => audio.controls.setPlaybackRate(rate ? Number(rate) : 1));
  }, [source.id]);

  useEffect(() => {
    if (startTime !== 0 && audio.state.duration !== 0) {
      audio.controls.seek(startTime >= 5 ? startTime - 5 : startTime);
    }
  }, [startTime, audio.state.duration]);

  useEffect(
    () => () => {
      videosDB.updateObject(source.id, {
        time: audio.state.time,
      });
    },
    [audio.state.time]
  );

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
