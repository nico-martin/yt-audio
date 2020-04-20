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
  const [start, setStart] = useState<number>(0);

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

  const Close = () => (
    <Link
      href="/"
      className="c-close c-close--relative text-gray-600 hover:text-black mt-1 ml-auto text-lg z-40"
      activeClassName=""
    >
      close
    </Link>
  );

  const Content = ({ className }: { className: string }) => {
    if (error !== '') {
      return (
        <div className={`${className} audio__error`}>
          <Icon icon="warning" className="audio__error-icon" />
          <p className="audio__error-text">{error}</p>
        </div>
      );
    }

    if (audio.url !== '') {
      return (
        <div className={className}>
          <Player
            source={{ ...audio, ...{ id: videoID } }}
            passStartTime={time => {
              startTime = time;
            }}
            setError={setError}
          />
          <div className="audio__about">
            <div className="audio__about-inner">
              <p>
                <h3>{audio.title}</h3>
                <Close />
              </p>
              <p>
                <span>{audio.author}</span>
              </p>
              <button
                onClick={() => {
                  window.open(
                    `https://www.youtube.com/watch?v=${videoID}&t=${Math.round(
                      startTime
                    )}`,
                    '_blank'
                  );
                }}
              >
                open video
              </button>
              {audio.description && (
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: nl2br(audio.description),
                    }}
                  />
                </div>
              )}
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
