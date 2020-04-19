import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { settingsDB } from '../store';
import Modal from '../global/Modal';
import cn from 'classnames';

import { HTMLAudioState, HTMLAudioControls } from './hooks/useAudio';

interface Props {
  audioState: HTMLAudioState;
  audioControls: HTMLAudioControls;
  className?: string;
}

const PlayerPlaybackSpeed = ({
  audioState,
  audioControls,
  className = '',
}: Props) => {
  const [modal, setModal] = useState(false);

  return (
    <div className={className}>
      <button onClick={() => setModal(true)}>{audioState.playbackRate}x</button>
      {modal && (
        <Modal
          title="Playback speed"
          onClose={() => setModal(false)}
          width="xsmall"
        >
          <p>
            {[
              [0.8, 'Bärndütsch'],
              [1.0, 'Boring'],
              [1.2, 'Speedy'],
              [1.5, 'Fast'],
              [2.0, 'Crazy'],
              [3.0, 'Out of this world'],
            ].map(([rate, text]: [number, string]) => (
              <button
                className={cn({
                  'font-bold': rate === audioState.playbackRate,
                })}
                onClick={() => {
                  setModal(false);
                  audioControls.setPlaybackRate(rate);
                }}
              >
                {text} ({rate}x)
              </button>
            ))}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default PlayerPlaybackSpeed;
