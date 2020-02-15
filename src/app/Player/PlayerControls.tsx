import { h } from 'preact';
import Icon from '../global/Icon';
import './PlayerControls.css';

interface Props {
  player: HTMLAudioElement;
  paused: boolean;
  className?: string;
}

const PlayerControls = ({ player, paused, className = '' }: Props) => {
  const addTime = add => (player.currentTime = player.currentTime + add);
  return (
    <div className={`flex justify-center ${className}`}>
      <button onClick={() => addTime(-30)} className="text-2xl">
        <Icon icon="30minus" />
      </button>
      <button
        className="text-4xl w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-full mx-4 player-controls-play"
        onClick={() => (paused ? player.play() : player.pause())}
      >
        <Icon
          className="text-white player-controls-play__icon"
          icon={paused ? 'play' : 'pause'}
        />
      </button>
      <button onClick={() => addTime(30)} className="text-2xl">
        <Icon icon="30plus" />
      </button>
    </div>
  );
};

export default PlayerControls;
