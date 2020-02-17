import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { readableTime } from '../vendor/helpers';
import './PlayerTimeline.css';

interface Props {
  player: HTMLAudioElement;
  time: number;
  className?: string;
}

const PlayerTimeline = ({ player, time, className = '' }: Props) => {
  const [playingBefore, setPlayingBefore] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sliderTime, setSliderTime] = useState(0);
  const [buffer, setBuffer] = useState(false);

  useEffect(() => {
    player.oncanplay = () => setDuration(Math.ceil(player.duration));
    player.onwaiting = () => setBuffer(true);
    player.onplaying = () => setBuffer(false);
  }, [player]);

  useEffect(() => {
    setSliderTime(time);
  }, [time]);

  const sliderWidth = (100 / duration) * sliderTime;
  return (
    <div className={className}>
      <div className="player-timeline">
        <input
          type="range"
          min="0"
          max={duration}
          value={sliderTime}
          step="1"
          disabled={buffer}
          onMouseDown={() => {
            setPlayingBefore(!player.paused);
            player.pause();
          }}
          onMouseUp={() => {
            playingBefore && player.play();
            setPlayingBefore(false);
          }}
          onChange={e =>
            (player.currentTime = parseInt(
              (e.target as HTMLInputElement).value
            ))
          }
          onInput={e =>
            setSliderTime(parseInt((e.target as HTMLInputElement).value))
          }
        />
        <span
          className="player-timeline__time"
          style={{
            width: (isNaN(sliderWidth) ? 0 : sliderWidth) + '%',
          }}
        />
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span>{readableTime(sliderTime)}</span>
        <span>-{readableTime(duration - sliderTime)}</span>
      </div>
    </div>
  );
};

export default PlayerTimeline;
