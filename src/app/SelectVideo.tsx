import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { youtubeParser } from '@common/helpers';
import './SelectVideo.css';
import Intro from './Intro';
import Recent from './Recent';
import Icon from './global/Icon';

const parsedUrl = new URL(String(window.location));

interface Props {
  history: { push: Function };
}

const SelectVideo: React.FC<Props> = ({ history }) => {
  const [input, setInput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [video, setVideo] = React.useState<string>('');
  const inputEl = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    const videolink = parsedUrl.searchParams.get('videolink');
    if (videolink && youtubeParser(videolink) !== '') {
      history.push(`/play/${youtubeParser(videolink)}/`);
    }
  }, []);

  React.useEffect(() => {
    const videoID = youtubeParser(input);
    if (videoID === '') {
      setError('No valid Youtube video ID found');
      setVideo('');
    } else {
      setError('');
      setVideo(videoID);
    }
  }, [input]);

  React.useEffect(() => {
    if (location.pathname === '/') {
      setInput('');
    }
  }, [location.pathname]);

  const hasError: boolean = false; // input !== '' && error !== '';
  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/play/${video}`);
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

export default withRouter(SelectVideo);
