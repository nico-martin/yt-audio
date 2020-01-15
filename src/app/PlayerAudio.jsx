// @flow

import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Audio } from '@app/vendor/types';
import db from '@app/store';

const PlayerAudio = ({
  audio,
  passStartTime,
}: {
  audio: Audio,
  passStartTime: Function,
}) => {
  const [startTime, setStartTime] = useState(0);
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

  useEffect(() => {
    passStartTime(startTime);
    player.current.currentTime =
      parseInt(startTime) >= 2 ? parseInt(startTime) - 2 : parseInt(startTime); // start at last position -2 Sec
  }, [startTime]);

  return (
    <audio controls className="w-full mt-4" ref={player}>
      {Object.keys(audio.formats).length !== 0 ? (
        Object.keys(audio.formats).map(mime => (
          <source src={audio.formats[mime]} type={mime} />
        ))
      ) : (
        <source src={audio.url} type="audio/ogg" />
      )}
    </audio>
  );
};

export default PlayerAudio;
