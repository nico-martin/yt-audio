import ApiFetch from '@common/apiFetch';
import { Audio } from '@common/types';
import { getSourceUrl } from '@common/url';

const apiFetch = new ApiFetch();

interface ServerRestart {
  serverIsRunning: boolean;
  restartInProgress: boolean;
  doRestart: boolean;
}

export const getServerRestart = () => {
  const restartUrl = process.env.RESTART_URL;
  if (!restartUrl) {
    return Promise.resolve({
      data: {
        serverIsRunning: true,
        restartInProgress: true,
        doRestart: false,
      },
    });
  }
  return apiFetch.get<ServerRestart>(restartUrl);
};
export const getAudioSource = (videoID: string) =>
  apiFetch.get<Audio>(`${getSourceUrl()}${videoID}/`);
