import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import axios from 'axios';
import Icon from './global/Icon';
import { videosDB } from './store';
import Player from './Player/Player';
import { nl2br } from './vendor/helpers';
import { Audio } from './vendor/types';

import './Audio.css';

interface Props {
  videoID: string;
}

const initTitle = document.title;
const initAudio = {
  url: '',
  author: '',
  title: '',
};

let startTime = 0;
const Audio = ({ videoID }: Props) => {
  const [error, setError] = useState<string>('');
  const [audio, setAudio] = useState<Audio>(initAudio);

  useEffect(() => {
    setError('');
    setAudio(initAudio);
    axios
      .get(`https://yt-source.nico.dev/${videoID}/`)
      .then(res => {
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
      .catch(err => {
        setError(`Audiofile for "${videoID}" not found`);
      });
    return () => {
      document.title = initTitle;
    };
  }, [videoID]);

  const Content = ({ className }: { className: string }) => {
    if (error !== '') {
      return (
        <div className={`${className} audio__error`}>
          <Icon icon="warning" className="audio__error-icon" />
          <p className="audio__error-text">
            {error}{' '}
            <button
              className="audio__error-reload"
              onClick={() => window.location.reload(true)}
            >
              (reload)
            </button>
          </p>
        </div>
      );
    }

    if (audio.url !== '') {
      return (
        <div className={className}>
          <Player
            source={{ ...audio, ...{ id: videoID } }}
            setError={setError}
          />
          <div className="audio__about">
            <div className="audio__about-inner">
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
              <Link href="/" className="audio__about-close" activeClassName="">
                <Icon icon="arrow" className="audio__about-close-icon" /> back
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${className} audio__loading`}>
        <div className="audio__loading-icon" />
        <p className="audio__loading-text">loading..</p>
      </div>
    );
  };

  return (
    <div className="audio">
      <Content className="audio__content" />
    </div>
  );
};

export default Audio;
