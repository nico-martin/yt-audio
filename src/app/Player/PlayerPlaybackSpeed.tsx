import React, { Fragment, useEffect, useState } from 'react';
import { settingsDB } from '../store';
import Modal from '../global/Modal';
import cn from 'classnames';

import './PlayerPlaybackSpeed.css';

import { HTMLAudioState, HTMLAudioControls } from './types';

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
    <Fragment>
      <button
        className={`${className} player-playback-speed`}
        onClick={() => setModal(true)}
      >
        {audioState.playbackRate}x
      </button>
      {modal && (
        <Modal
          title="Playback speed"
          onClose={() => setModal(false)}
          width="small"
        >
          <p className="player-playback-speed-modal">
            {[
              [0.8, 'Bärndütsch'],
              [1.0, 'Boring'],
              [1.2, 'Speedy'],
              [1.5, 'Fast'],
              [2.0, 'Crazy'],
              [3.0, 'Out of this world'],
            ].map(([rate, text]: [number, string]) => (
              <button
                className={cn('player-playback-speed-modal__button', {
                  'player-playback-speed-modal__button--active':
                    rate === audioState.playbackRate,
                })}
                onClick={() => {
                  setModal(false);
                  audioControls.setPlaybackRate(rate);
                  settingsDB.set('playbackRate', rate);
                }}
              >
                {text} ({rate}x)
              </button>
            ))}
          </p>
        </Modal>
      )}
    </Fragment>
  );
};

export default PlayerPlaybackSpeed;
