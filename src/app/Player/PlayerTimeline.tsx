import cn from 'classnames';
import React from 'react';
import { readableTime } from '@common/helpers';
import './PlayerTimeline.css';
import { HTMLAudioState, HTMLAudioControls } from '../hooks/useAudio';

interface Props {
  audioState: HTMLAudioState;
  audioControls: HTMLAudioControls;
  className?: string;
}

const PlayerTimeline = ({
  audioState,
  audioControls,
  className = '',
}: Props) => {
  const [playingBefore, setPlayingBefore] = React.useState<boolean>(false);
  const [sliderTime, setSliderTime] = React.useState<number>(0);

  React.useEffect(() => {
    setSliderTime(audioState.time);
  }, [audioState.time]);

  const sliderWidth = (100 / audioState.duration) * sliderTime;
  return (
    <div className={`${className} player-timeline`}>
      <div className="player-timeline__timeline">
        <input
          type="range"
          min="0"
          max={audioState.duration}
          value={sliderTime}
          step="1"
          disabled={audioState.waiting}
          onMouseDown={() => {
            setPlayingBefore(!audioState.paused);
            audioControls.pause();
          }}
          onMouseUp={() => {
            playingBefore && audioControls.play();
            setPlayingBefore(false);
          }}
          onChange={(e) =>
            audioControls.seek(parseInt((e.target as HTMLInputElement).value))
          }
          onInput={(e) => {
            setSliderTime(parseInt((e.target as HTMLInputElement).value));
          }}
        />
        <span
          className={cn('player-timeline__time', {
            'player-timeline__time--disabled': audioState.waiting,
          })}
          style={{
            width: (isNaN(sliderWidth) ? 0 : sliderWidth) + '%',
          }}
        />
      </div>
      <div className="player-timeline__times">
        <span>{readableTime(audioState.time)}</span>
        <span>-{readableTime(audioState.duration - audioState.time)}</span>
      </div>
    </div>
  );
};

export default PlayerTimeline;
