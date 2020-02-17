import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Audio } from '../vendor/types';
import { videosDB, settingsDB } from '../store';
import PlayerTimeline from './PlayerTimeline';
import PlayerPlaybackSpeed from './PlayerPlaybackSpeed';
import PlayerControls from './PlayerControls';
import PlayerReplay from './PlayerReplay';

interface Props {
  audio: Audio;
  passStartTime: Function;
  setError: Function;
}

const Player = ({ audio, passStartTime, setError }: Props) => {
  const [paused, setPaused] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [time, setTime] = useState(0);
  const [refLoaded, setRefLoaded] = useState(false);
  const playerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => setRefLoaded(true), []);

  return (
    <Fragment>
      <audio
        controls={false}
        className="w-full mt-4"
        ref={playerRef}
        onError={() => setError('There was an error playing the audio file')}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        onRateChange={e =>
          setPlaybackRate((e.target as HTMLAudioElement).playbackRate)
        }
        onTimeUpdate={() => {
          if (playerRef.current) {
            window.setInterval(
              () => setTime(Math.floor(playerRef.current.currentTime)),
              1000
            );
          }
        }}
      >
        {Object.keys(audio.formats).length !== 0 ? (
          Object.keys(audio.formats).map(mime => (
            <source
              src={audio.formats[mime]}
              type={mime}
              onError={() =>
                setError('There was an error loading the audio file')
              }
            />
          ))
        ) : (
          <source src={audio.url} type="audio/ogg" />
        )}
      </audio>
      {playerRef && playerRef.current && (
        <Fragment>
          <div className="flex w-full justify-between items-center">
            <PlayerPlaybackSpeed
              player={playerRef.current}
              speed={playbackRate}
            />
            <PlayerControls player={playerRef.current} paused={paused} />
            <PlayerReplay player={playerRef.current} />
          </div>
          <PlayerTimeline
            player={playerRef.current}
            time={time}
            className="mt-2"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Player;
