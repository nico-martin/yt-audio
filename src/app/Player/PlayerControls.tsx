import { h, Fragment } from 'preact';
import Icon from '../global/Icon';

interface Props {
  player: HTMLAudioElement;
  paused: boolean;
}

const PlayerControls = ({ player, paused }: Props) => {
  const addTime = add => (player.currentTime = player.currentTime + add);
  return (
    <Fragment>
      <button onClick={() => addTime(-30)} className="player__stepback">
        <Icon icon="30minus" />
      </button>
      <button
        className="player__play"
        onClick={() => (paused ? player.play() : player.pause())}
      >
        <Icon className="player__play-icon" icon={paused ? 'play' : 'pause'} />
      </button>
      <button onClick={() => addTime(30)} className="player__stepforward">
        <Icon icon="30plus" />
      </button>
    </Fragment>
  );
};

export default PlayerControls;
