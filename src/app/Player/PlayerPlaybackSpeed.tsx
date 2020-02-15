import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { settingsDB } from '../store';
import Modal from '../global/Modal';
import cn from 'classnames';

interface Props {
  player: HTMLAudioElement;
  speed: number;
  className?: string;
}

const PlayerPlaybackSpeed = ({ player, speed, className = '' }: Props) => {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    settingsDB
      .get('playbackRate')
      .then(rate => (player.playbackRate = Number(rate || speed)));
  }, []);

  return (
    <div className={className}>
      <button onClick={() => setModal(true)} className="font-bold">
        {speed}x
      </button>
      {modal && (
        <Modal
          title="Playback speed"
          onClose={() => setModal(false)}
          width="xsmall"
        >
          <p className="border-t border-gray-400 mt-4">
            {[
              [0.8, 'Jamaica'],
              [1.0, 'Boring'],
              [1.2, 'Speedy'],
              [1.5, 'Fast'],
              [2.0, 'Crazy'],
              [3.0, 'Aleksej'],
            ].map(([rate, text]: [number, string]) => (
              <button
                className={cn(
                  'w-full border-b border-gray-400 hover:bg-gray-100 py-2 px-1 text-left font-light',
                  {
                    'font-bold': rate === speed,
                  }
                )}
                onClick={() => {
                  settingsDB.set('playbackRate', rate);
                  setModal(false);
                  player.playbackRate = rate;
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
