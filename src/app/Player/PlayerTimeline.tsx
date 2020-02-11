import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { readableTime } from '../vendor/helpers';
import './PlayerTimeline.css';

interface Props {
  player: HTMLAudioElement;
  time: number;
}

const PlayerTimeline = ({ player, time }: Props) => {
  const [duration, setDuration] = useState(100);
  const [buffer, setBuffer] = useState(false);

  useEffect(() => {
    player.oncanplay = () => setDuration(Math.ceil(player.duration));
    player.onwaiting = () => setBuffer(true);
    player.onplaying = () => setBuffer(false);
  }, [player]);

  return (
    <Fragment>
      <div className="player-timeline">
        <span
          className="player-timeline__time"
          style={{
            width: (duration / 100) * time + '%',
          }}
        />
        <input
          type="range"
          min="0"
          max={duration}
          value={time}
          step="1"
          onMouseDown={() => player.pause()}
          onMouseUp={() => player.play()}
          onInput={e =>
            (player.currentTime = parseInt(
              (e.target as HTMLInputElement).value
            ))
          }
        />
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span>{readableTime(time)}</span>
        <span>-{readableTime(-(time - duration))}</span>
      </div>
    </Fragment>
  );
};

export default PlayerTimeline;
