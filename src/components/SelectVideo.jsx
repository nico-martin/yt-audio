// @flow

import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import cn from 'classnames';
import { Link } from 'preact-router/match';
import { youtubeParser } from '@app/vendor/helpers';

const parsedUrl = new URL(window.location);

const SelectVideo = () => {
  const [url: string, setUrl] = useState(
    parsedUrl.searchParams.get('url') === null
      ? ''
      : parsedUrl.searchParams.get('url')
  );
  const [error: string, setError] = useState('');
  const [video: string, setVideo] = useState('');
  const inputEl = useRef(null);

  const updateURL = () => {
    setUrl(inputEl.current.value);
  };

  useEffect(() => {
    const videoID = youtubeParser(url);
    if (videoID === '') {
      setError('No valid Youtube video ID found');
      setVideo('');
    } else {
      setError('');
      setVideo(videoID);
    }
  }, [url]);

  const hasError: boolean = url !== '' && error !== '';

  return (
    <p className="text-left">
      <label>
        <b>Youtube video URL</b>
        <input
          type="text"
          ref={inputEl}
          className={cn(
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2',
            {
              'border-red-500': hasError,
            }
          )}
          onKeyUp={() => updateURL()}
          value={url}
        />
        {hasError && (
          <span className="text-right text-red-500 block italic">{error}</span>
        )}
      </label>
      <div className="mt-4">
        {video !== '' && (
          <Link
            href={`/play/${video}/`}
            className="font-bold py-2 rounded bg-blue-500 text-white px-4 hover:bg-blue-700 text-center no-underline block w-full"
          >
            Open Audio
          </Link>
        )}
      </div>
    </p>
  );
};

export default SelectVideo;
