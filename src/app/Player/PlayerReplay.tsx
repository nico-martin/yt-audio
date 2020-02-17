import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { settingsDB } from '../store';
import Icon from './../global/Icon';

interface Props {
  player: HTMLAudioElement;
  className?: string;
}

const PlayerReplay = ({ player, className = '' }: Props) => {
  const states = ['none', 'one', 'all'];
  const [replayState, setReplayState] = useState(0);

  useEffect(() => {
    settingsDB.get('replay').then(v => {
      setReplayState(Number(v));
    });
  }, []);

  useEffect(() => {
    settingsDB.set('replay', replayState);
    player.onended = () => {
      if (replayState !== 0) {
        player.currentTime = 0;
        player.play();
      }
      if (replayState === 1) {
        setReplayState(0);
      }
    };
  }, [replayState]);

  return (
    <button
      onClick={() =>
        setReplayState(replayState >= states.length - 1 ? 0 : replayState + 1)
      }
      className={className}
    >
      <Icon icon={`replay-${states[replayState]}`} />
    </button>
  );
};

export default PlayerReplay;
