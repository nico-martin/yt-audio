// @flow

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import axios from 'axios';
import Icon from '@app/components/global/Icon';
import cn from 'classnames';
import db from '@app/store';

type Audio = {
  url: string,
  author: string,
  title: string,
};

const initAudio = {
  url: '',
  author: '',
  title: '',
};

const Player = ({ videoID }: { videoID: string }) => {
  const [error: string, setError] = useState('');
  const [audio: Audio, setAudio] = useState(initAudio);
  const [play: boolean, setPlay] = useState(false);

  useEffect(() => {
    setError('');
    setAudio(initAudio);
    setPlay(false);

    axios
      .get(`https://yt-source.nico.dev/${videoID}/`)
      .then(res => {
        if (!res.data.url) {
          setError('An unexpected error occured');
        } else {
          setAudio(res.data);
          db.set(videoID, { ...res.data, id: videoID, date: new Date() });
        }
      })
      .catch(err => {
        setError('Audiofile not found');
      });
  }, [videoID]);

  let content = (
    <Fragment>
      <Icon icon="loading" className="text-4xl mr-4 icon--animation-spin-1s" />
      <p>loading..</p>
    </Fragment>
  );

  if (error !== '') {
    content = (
      <Fragment>
        <Icon icon="warning" className="text-4xl mr-4" />
        <p>{error}</p>
      </Fragment>
    );
  }

  if (audio.url !== '') {
    content = (
      <Fragment>
        {!play && (
          <button onClick={() => setPlay(true)}>
            <Icon icon="play" className="text-4xl mr-4" />
          </button>
        )}
        <p>
          <b className="block">{audio.title}</b>
          <span className="block text-sm italic">{audio.author}</span>
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 pb-12 shadow z-40">
        <div className="w-full max-w-md mx-auto items-center flex">
          {content}
        </div>
        {play && (
          <Fragment>
            <div className="text-xs w-full max-w-md mx-auto">
              <a
                href={`https://www.youtube.com/watch?v=${videoID}`}
                className="cursor-pointer underline mt-2 inline-block"
              >
                open video
              </a>
              <audio controls autoPlay={true} className="w-full mt-4">
                <source src={audio.url} type="audio/ogg" />
              </audio>
            </div>
          </Fragment>
        )}
      </div>
      <div className="fixed bottom-0 top-0 left-0 right-0 bg-black opacity-75" />
      <Link href="/" className="player-close text-white text-2xl">
        close
      </Link>
    </Fragment>
  );
};

export default Player;
