import cn from 'classnames';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectVideo.css';
import Intro from './Intro';
import Recent from './Recent';
import Icon from './global/Icon';
import { youtubeParser } from './vendor/helpers';

const parsedUrl = new URL(String(window.location));

const SelectVideo: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const inputEl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const videolink = parsedUrl.searchParams.get('videolink');
    if (videolink && youtubeParser(videolink) !== '') {
      navigate(`/play/${youtubeParser(videolink)}/`);
    }
  }, []);

  useEffect(() => {
    const videoID = youtubeParser(input);
    if (videoID === '') {
      setError('No valid Youtube video ID found');
      setVideo('');
    } else {
      setError('');
      setVideo(videoID);
    }
  }, [input]);

  useEffect(() => {
    if (location.pathname === '/') {
      setInput('');
    }
  }, [location.pathname]);

  const hasError: boolean = false; // input !== '' && error !== '';
  const onSubmit = e => {
    e.preventDefault();
    navigate(`/play/${video}`);
  };

  return (
    <div className="app__content">
      <div className="selectvideo">
        <form className="selectvideo__form" onSubmit={onSubmit}>
          <label htmlFor="youtubeUrl" className="selectvideo__label">
            Youtube video URL
          </label>
          <div className="selectvideo__row">
            <input
              type="text"
              name="youtubeUrl"
              id="youtubeUrl"
              ref={inputEl}
              className="selectvideo__input"
              onKeyUp={() => setInput(inputEl.current.value)}
              onChange={() => setInput(inputEl.current.value)}
              value={input}
            />
            <button
              className="selectvideo__submit"
              title="Open Audio"
              disabled={video === ''}
            >
              <Icon className="selectvideo__icon" icon="play" />
            </button>
          </div>
        </form>
        {hasError && <span className="selectvideo__error">{error}</span>}
      </div>
      <Recent searchString={input} Intro={Intro} />
    </div>
  );
};

export default SelectVideo;
