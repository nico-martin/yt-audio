import React, { useEffect, useState } from 'react';
import { readableTime } from '../vendor/helpers';
import cn from 'classnames';
import './PlayerTimeline.css';

import { HTMLAudioState, HTMLAudioControls } from './types';

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
  const [playingBefore, setPlayingBefore] = useState(false);
  const [sliderTime, setSliderTime] = useState(0);

  useEffect(() => {
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
          onChange={e =>
            audioControls.seek(parseInt((e.target as HTMLInputElement).value))
          }
          onInput={e => {
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
