import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import axios from 'axios';
import Icon from './global/Icon';
import db from './store';
import PlayerAudio from './PlayerAudio';
import { nl2br } from './vendor/helpers';
import { Audio } from './vendor/types';

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
const Player = ({ videoID }:Props) => {
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
          db.updateObject(videoID, {
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

  const Content = () => {
    if (error !== '') {
      return (
        <div className="flex items-center w-full">
          <Icon icon="warning" className="text-4xl mr-4" />
          <p>{error}</p>
          <Close />
        </div>
      );
    }

    if (audio.url !== '') {
      return (
        <Fragment>
          <p className="flex">
            <b className="block mr-4">{audio.title}</b>
            <Close />
          </p>
          <p>
            <span className="block text-sm italic mt-1">{audio.author}</span>
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
            className="cursor-pointer underline my-4 text-blue-700 inline-block text-xs"
          >
            open video
          </button>
          {audio.description && (
            <div className="overflow-x-auto mb-8" style={{ maxHeight: '50vh' }}>
              <p
                className="text-xs"
                dangerouslySetInnerHTML={{
                  __html: nl2br(audio.description),
                }}
              />
            </div>
          )}
          <PlayerAudio
            audio={{ ...audio, ...{ id: videoID } }}
            passStartTime={time => {
              startTime = time;
            }}
            setError={setError}
          />
        </Fragment>
      );
    }

    return (
      <div className="flex items-center w-full">
        <Icon
          icon="loading"
          className="text-4xl mr-4 icon--animation-spin-1s"
        />
        <p>loading..</p>
        <Close />
      </div>
    );
  };

  return (
    <Fragment>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg-top z-40">
        <div className="w-full max-w-md mx-auto">
          <Content />
        </div>
      </div>
      <div className="fixed bottom-0 top-0 left-0 right-0 bg-black opacity-75 z-30" />
    </Fragment>
  );
};

export default Player;
