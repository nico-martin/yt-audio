import ApiFetch from '@common/apiFetch';
import { Audio } from '@common/types';

const apiFetch = new ApiFetch();

interface ServerRestart {
  serverIsRunning: boolean;
  restartInProgress: boolean;
  doRestart: boolean;
}

export const getServerRestart = () =>
  apiFetch.get<ServerRestart>('https://restart-source.ytaud.io/restart.php');

export const getAudioSource = (videoID: string) =>
  apiFetch.get<Audio>(`https://yt-source.nico.dev/${videoID}/`);
