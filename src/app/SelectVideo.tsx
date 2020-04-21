import { h, Fragment } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import cn from 'classnames';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { youtubeParser } from './vendor/helpers';
import Recent from './Recent';
import Intro from './Intro';
import Icon from './global/Icon';

import './SelectVideo.css';

const parsedUrl = new URL(String(window.location));

const SelectVideo = ({ currentUrl }: { currentUrl: string }) => {
  const [input, setInput] = useState<string>(
    parsedUrl.searchParams.get('text') === null
      ? ''
      : parsedUrl.searchParams.get('text')
  );
  const [error, setError] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const inputEl = useRef(null);

  useEffect(() => {
    const videoID = youtubeParser(input);
    if (videoID === '') {
      setError('No valid Youtube video ID found');
      setVideo('');
    } else {
      setError('');
      setVideo(videoID);
      if (new URL(String(window.location)).searchParams.get('text') !== null) {
        route(`/play/${videoID}/`, true);
      }
    }
  }, [input]);

  useEffect(() => {
    if (currentUrl === '/') {
      setInput('');
    }
  }, [currentUrl]);

  const hasError: boolean = false; // input !== '' && error !== '';
  const onSubmit = e => {
    e.preventDefault();
    route(`/play/${video}`);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SelectVideo;
