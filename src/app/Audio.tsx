import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { nl2br } from '@common/helpers';
import { Audio as AudioType } from '@common/types';
import './Audio.css';
import Player from './Player/Player';
import Icon from './global/Icon';
import { videosDB } from './store';

const initTitle = document.title;
const initAudio = {
  url: '',
  author: '',
  title: '',
};

let startTime = 0;
const Audio = ({ className = '' }: { className?: string }) => {
  const [error, setError] = React.useState<string>('');
  const [audio, setAudio] = React.useState<AudioType>(initAudio);
  const [audioTime, setAudioTime] = React.useState<number>(0);
  const { videoID } = useParams<{ videoID: string }>();

  React.useEffect(() => {
    document.querySelector('#app').classList.add('app--player');
    return () => document.querySelector('#app').classList.remove('app--player');
  });

  React.useEffect(() => {
    setError('');
    setAudio(initAudio);
    axios
      .get(`https://yt-source.nico.dev/${videoID}/`)
      .then((res) => {
        if (!res.data.url) {
          setError('An unexpected error occured');
        } else {
          setAudio(res.data);
          document.title = res.data.title;
          videosDB.updateObject(videoID, {
            ...res.data,
            id: videoID,
            date: new Date(),
          });
        }
      })
      .catch((err) => {
        setError(`Audiofile for "${videoID}" not found`);
      });
    return () => {
      document.title = initTitle;
    };
  }, [videoID]);

  if (error !== '') {
    return (
      <div className={`${className} audio audio--error`}>
        <Icon icon="warning" className="audio__icon" />
        <p className="audio__error-text">{error}</p>
        <p className="audio__error-reload">
          <button
            className="audio__error-reload-button"
            onClick={(e) => {
              window.location.reload();
              (e.target as HTMLButtonElement).setAttribute(
                'disabled',
                'disabled'
              );
            }}
          >
            <Icon icon="reload" className="audio__error-reload-button-icon" />
            retry
          </button>
        </p>
      </div>
    );
  }

  if (audio.url !== '') {
    return (
      <div className={`${className} audio`}>
        <div className="audio__about">
          <h3>{audio.title}</h3>
          <p className="audio__about-author">{audio.author}</p>
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
          {audio.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: nl2br(audio.description),
              }}
            />
          )}
          <Link to="/" className="audio__about-close">
            <Icon icon="arrow" className="audio__about-close-icon" /> back
          </Link>
        </div>
        <Player
          source={{ ...audio, ...{ id: videoID } }}
          setError={setError}
          className="audio__player"
        />
      </div>
    );
  }

  return (
    <div className={`${className} audio audio--loading`}>
      <div className="audio__icon audio__icon--loading" />
      <p className="audio__loading-text">loading..</p>
    </div>
  );
};

export default Audio;
