// @flow

import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Audio } from '@app/vendor/types';
import db from '@app/store';
import Icon from '@app/global/Icon';
import cn from 'classnames';

const PlayerAudio = ({
  audio,
  passStartTime,
  setError,
}: {
  audio: Audio,
  passStartTime: Function,
  setError: Function,
}) => {
  const [startTime, setStartTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playTime, setPlayTime] = useState(0);
  const player = useRef(null);

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

  useEffect(() =>
    window.setInterval(() => setPlayTime(player.current.currentTime, 1000))
  );

  useEffect(() => {
    db.updateObject(audio.id, { time: player.current.currentTime });
  }, [playing]);

  useEffect(() => {
    if (playing) {
      player.current.play();
    } else {
      player.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    passStartTime(startTime);
    player.current.currentTime =
      parseInt(startTime) >= 2 ? parseInt(startTime) - 2 : parseInt(startTime); // start at last position -2 Sec
  }, [startTime]);

  useEffect(() => {
    player.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const setTime = add =>
    (player.current.currentTime = player.current.currentTime + add);

  return (
    <Fragment>
      <audio
        controls
        className="w-full mt-4"
        ref={player}
        onError={() => setError('There was an error playing the audio file')}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        //onTimeUpdate={() => setPlayTime(player.current.currentTime)}
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
        <button onClick={() => setTime(-30)}>
          <Icon icon="30minus" />
        </button>
        <button className="text-4xl" onClick={() => setPlaying(!playing)}>
          <Icon icon={playing ? 'pause' : 'play'} />
        </button>
        <button onClick={() => setTime(30)}>
          <Icon icon="30plus" />
        </button>
        <p>
          {[0.8, 1, 1.2, 1.5].map(speed => (
            <button
              className={cn({
                underline: playbackRate === speed,
              })}
              onClick={() => setPlaybackRate(speed)}
            >
              {speed}x
            </button>
          ))}
        </p>
      </div>
      {parseInt(playTime)}
    </Fragment>
  );
};

export default PlayerAudio;
