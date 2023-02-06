import React from 'react';
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { nl2br } from '@common/helpers';
import './Audio.css';
import app from '../../app.json';
import Player from './Player/Player';
import Icon from './global/Icon';
import useAudioSource, { STATE as AUDIO_STATE } from './hooks/useAudioSource';
import { videosDB } from './store';

let startTime = 0;
const Audio = ({ className = '' }: { className?: string }) => {
  const { videoID } = useParams<{ videoID: string }>();
  const audio = useAudioSource(videoID);

  React.useEffect(() => {
    document.querySelector('#app').classList.add('app--player');
    return () => document.querySelector('#app').classList.remove('app--player');
  }, []);

  React.useEffect(() => {
    audio.state === AUDIO_STATE.SUCCESS &&
      videosDB.updateObject(videoID, {
        ...audio.data,
        id: videoID,
        date: new Date(),
      });
  }, [audio.data]);

  return audio.state === AUDIO_STATE.ERROR ? (
    <div className={`${className} audio audio--error`}>
      <Icon icon="warning" className="audio__icon" />
      <p className="audio__error-text">{audio.info}</p>
      <p className="audio__error-reload">
        <button
          className="audio__error-reload-button"
          onClick={(e) => audio.reload()}
        >
          <Icon icon="reload" className="audio__error-reload-button-icon" />
          retry
        </button>
      </p>
    </div>
  ) : audio.state === AUDIO_STATE.LOADING ? (
    <div className={`${className} audio audio--loading`}>
      <div className="audio__icon audio__icon--loading" />
      <p className="audio__loading-text">loading..</p>
      {/*audio.info && <p className="audio__loading-text">{audio.info}</p>*/}
    </div>
  ) : audio.state === AUDIO_STATE.SUCCESS ? (
    <div className={`${className} audio`}>
      <Helmet>
        <title>
          {audio.data.title} - {app.title}
        </title>
      </Helmet>
      <div className="audio__about">
        <h3>{audio.data.title}</h3>
        <p className="audio__about-author">{audio.data.author}</p>
        <button
          className="audio__about-open"
          onClick={() => {
            window.open(
              `https://www.youtube.com/watch?v=${videoID}&t=${Math.round(
                startTime
              )}`,
              '_blank'
            );
          }}
        >
          <Icon icon="youtube" className="audio__about-open-icon" />
          open video
        </button>
        {audio.data.description && (
          <p
            dangerouslySetInnerHTML={{
              __html: nl2br(audio.data.description),
            }}
          />
        )}
        <Link to="/" className="audio__about-close">
          <Icon icon="arrow" className="audio__about-close-icon" /> back
        </Link>
      </div>
      <Player
        source={{ ...audio.data, ...{ id: videoID } }}
        className="audio__player"
      />
    </div>
  ) : null;
};

export default Audio;
