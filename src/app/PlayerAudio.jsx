// @flow

import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Audio } from '@app/vendor/types';
import db from '@app/store';

const PlayerAudio = ({ audio }: { audio: Audio }) => {
  const [startTime, setStartTime] = useState(0);
  const player = useRef(null);

  useEffect(() => {
    db.get(audio.id).then(dbVideo => {
      dbVideo && dbVideo.time && setStartTime(dbVideo.time);
    });
    return () =>
      db.updateObject(audio.id, { time: player.current.currentTime });
  }, [audio]);

  useEffect(() => {
    player.current.currentTime = startTime;
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
