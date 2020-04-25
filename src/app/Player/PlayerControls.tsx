import React, { Fragment } from 'react';
import Icon from '../global/Icon';

import { HTMLAudioState, HTMLAudioControls } from './types';

interface Props {
  audioState: HTMLAudioState;
  audioControls: HTMLAudioControls;
}

const PlayerControls = ({ audioState, audioControls }: Props) => (
  <Fragment>
    <button
      disabled={audioState.waiting}
      onClick={() => audioControls.seek(audioState.time - 30)}
      className="player__stepback"
    >
      <Icon icon="30minus" />
    </button>
    <button
      className="player__play"
      disabled={audioState.waiting}
      onClick={() =>
        audioState.paused ? audioControls.play() : audioControls.pause()
      }
    >
      <Icon
        className="player__play-icon"
        icon={audioState.paused ? 'play' : 'pause'}
      />
    </button>
    <button
      disabled={audioState.waiting}
      onClick={() => audioControls.seek(audioState.time + 30)}
      className="player__stepforward"
    >
      <Icon icon="30plus" />
    </button>
  </Fragment>
);

export default PlayerControls;
