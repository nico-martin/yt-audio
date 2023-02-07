import React from 'react';
import { getAudioSource, getServerRestart } from '@common/api';
import { Audio as AudioType } from '@common/types';

export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initAudio = {
  url: '',
  author: '',
  title: '',
};

const useAudioSource = (
  videoID: string
): {
  state: STATE;
  info: string;
  data: AudioType;
  reload: () => void;
} => {
  const [state, setState] = React.useState<STATE>(STATE.IDLE);
  const [info, setInfo] = React.useState<string>('');
  const [data, setData] = React.useState<AudioType>(initAudio);

  const loadAudioSourceLoop = () =>
    getAudioSource(videoID).then(({ data, ok }) => {
      if (ok) {
        setData(data);
        setState(STATE.SUCCESS);
      } else {
        window.setTimeout(() => loadAudioSourceLoop(), 2000);
      }
    });

  const load = () => {
    setState(STATE.LOADING);
    setInfo('');
    getAudioSource(videoID).then(({ status, data, ok, error }) => {
      if (!ok && status === 0) {
        //setInfo('We need to restart our servers. This might take a while.');
        getServerRestart().then(({ data }) => {
          if (data?.doRestart || data?.restartInProgress) {
            loadAudioSourceLoop();
          } else {
            setInfo('An unexpected error occurred');
            setState(STATE.ERROR);
          }
        });
      } else if (!ok) {
        setInfo(`Video "${videoID}" could not be found.`);
        setState(STATE.ERROR);
      } else {
        setData(data);
        setState(STATE.SUCCESS);
      }
    });
  };

  React.useEffect(() => {
    load();
  }, [videoID]);

  return { state, info, data, reload: load };
};

export default useAudioSource;
