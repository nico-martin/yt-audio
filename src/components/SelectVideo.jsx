// @flow

import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import cn from 'classnames';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { youtubeParser } from '@app/vendor/helpers';
import Recent from '@app/components/Recent';
import Icon from '@app/components/global/Icon';

const parsedUrl = new URL(window.location);

const SelectVideo = ({ currentUrl }: { currentUrl: string }) => {
  const [input: string, setInput] = useState(
    parsedUrl.searchParams.get('text') === null
      ? ''
      : parsedUrl.searchParams.get('text')
  );
  const [error: string, setError] = useState('');
  const [video: string, setVideo] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    const videoID = youtubeParser(input);
    if (videoID === '') {
      setError('No valid Youtube video ID found');
      setVideo('');
    } else {
      setError('');
      setVideo(videoID);
      if (new URL(window.location).searchParams.get('text') !== null) {
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

  return (
    <p className="text-left">
      <label htmlFor="youtubeUrl" className="text-xs">
        Youtube video URL
      </label>
      <div className="flex mt-1">
        <input
          type="text"
          name="youtubeUrl"
          id="youtubeUrl"
          ref={inputEl}
          className={cn(
            'appearance-none border rounded rounded-r-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            {
              'border-red-500': hasError,
            }
          )}
          onKeyUp={() => setInput(inputEl.current.value)}
          onChange={() => setInput(inputEl.current.value)}
          value={input}
        />
        <Link
          href={`/play/${video}`}
          activeClassName=""
          className={cn(
            'font-bold rounded rounded-l-none text-white px-4 hover:bg-blue-700 text-center no-underline block flex items-center',
            {
              'bg-gray-500': video === '',
              'bg-blue-500': video !== '',
              'pointer-events-none': video === '',
            }
          )}
          title="Open Audio"
        >
          <Icon icon="play" />
        </Link>
      </div>
      {hasError && (
        <span className="text-right text-red-500 block italic">{error}</span>
      )}
      <Recent searchString={input} />
    </p>
  );
};

export default SelectVideo;
