import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Audio } from './vendor/types';
import db from './store';
import Icon from './global/Icon';
import cn from 'classnames';
import { readableTime } from './vendor/helpers';

interface Props {
  audio: Audio;
  passStartTime: Function;
  setError: Function;
}

const PlayerAudio = ({ audio, passStartTime, setError }: Props) => {
  const [startTime, setStartTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playTime, setPlayTime] = useState(0);
  const [fullDuration, setFullDuration] = useState(100);
  const [buffer, setBuffer] = useState(false);
  const player = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    player.current.ontimeupdate = () => {
      passStartTime(player.current.currentTime);
    };

    db.get(audio.id).then(dbVideo => {
      dbVideo && dbVideo.time && setStartTime(dbVideo.time);
    });
    return () =>
      db.updateObject(audio.id, { time: player.current.currentTime });
  }, []);

  useEffect(() => {
    passStartTime(startTime);
    player.current.currentTime =
      Math.round(startTime) >= 2
        ? Math.round(startTime) - 2
        : Math.round(startTime); // start at last position -2 Sec
  }, [startTime]);

  const addTime = add =>
    (player.current.currentTime = player.current.currentTime + add);
  const setTime = time => (player.current.currentTime = time);

  return (
    <Fragment>
      <audio
        controls
        className="w-full mt-4"
        ref={player}
        onError={() => setError('There was an error playing the audio file')}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={() => setPlayTime(player.current.currentTime)}
        onCanPlay={() => setFullDuration(Math.round(player.current.duration))}
        onWaiting={() => setBuffer(true)}
        onPlaying={() => setBuffer(false)}
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
      <div className="flex">
        <button onClick={() => addTime(-30)}>
          <Icon icon="30minus" />
        </button>
        <button
          className="text-4xl"
          onClick={() => {
            !playing ? player.current.play() : player.current.pause();
            setPlaying(!playing);
          }}
        >
          <Icon icon={playing ? 'pause' : 'play'} />
        </button>
        <button onClick={() => addTime(30)}>
          <Icon icon="30plus" />
        </button>
        <p>
          {[0.8, 1, 1.2, 1.5].map(speed => (
            <button
              className={cn({
                underline: playbackRate === speed,
              })}
              onClick={() => {
                player.current.playbackRate = speed;
                setPlaybackRate(speed);
              }}
            >
              {speed}x
            </button>
          ))}
        </p>
      </div>
      <input
        type="range"
        min="0"
        max={fullDuration}
        value={Math.round(playTime)}
        step="1"
        onChange={e => setTime((e.target as HTMLInputElement).value)}
      />
      <p>{readableTime(Math.round(playTime))}</p>
      <p>{buffer ? 'buffer' : ''}</p>
    </Fragment>
  );
};

export default PlayerAudio;
