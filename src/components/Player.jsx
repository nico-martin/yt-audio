// @flow

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import axios from 'axios';
import Icon from '@app/components/global/Icon';
import cn from 'classnames';
import db from '@app/store';
import { nl2br } from '@app/vendor/helpers';

type Audio = {
  url: string,
  formats: {},
  author: string,
  description: string,
  title: string,
};

const initTitle = document.title;
const initAudio = {
  url: '',
  author: '',
  title: '',
};

const Player = ({ videoID }: { videoID: string }) => {
  const [error: string, setError] = useState('');
  const [audio: Audio, setAudio] = useState(initAudio);

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
          db.set(videoID, { ...res.data, id: videoID, date: new Date() });
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
          <a
            href={`https://www.youtube.com/watch?v=${videoID}`}
            className="cursor-pointer underline my-4 text-blue-700 inline-block text-xs"
          >
            open video
          </a>
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
          <audio controls className="w-full mt-4">
            {Object.keys(audio.formats).length !== 0 ? (
              Object.keys(audio.formats).map(mime => (
                <source src={audio.formats[mime]} type={mime} />
              ))
            ) : (
              <source src={audio.url} type="audio/ogg" />
            )}
          </audio>
        </Fragment>
      );
    }

    if (error !== '') {
      return (
        <div className="flex items-center w-full">
          <Icon icon="warning" className="text-4xl mr-4" />
          <p>{error}</p>
          <Close />
        </div>
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
