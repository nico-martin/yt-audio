// @flow

import { h } from 'preact';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'preact/hooks';
import db from '@app/store';
import { Link } from 'preact-router/match';

type Video = {
  url: string,
  author: string,
  title: string,
  id: string,
  date: Date,
};

const Recent = () => {
  const [videos: Array<Video>, setVideos] = useState([]);
  const [filteredVideos: Array<Video>, setFilteredVideos] = useState([]);
  const [searchString: string, setSearchString] = useState('');
  const inputEl = useRef(null);
  const filter = () => {};

  useEffect(
    () =>
      db.getAll().then(resp => {
        const v = resp.sort((a, b) => b.date.getTime() - a.date.getTime());
        setVideos(v);
        setFilteredVideos(v);
      }),
    []
  );

  useEffect(
    () =>
      setFilteredVideos(
        videos.filter(video => {
          return (
            video.author.indexOf(searchString) !== -1 ||
            video.title.indexOf(searchString) !== -1
          );
        })
      ),
    [videos, searchString]
  );

  return (
    <p className="text-left">
      <label htmlFor="search" className="text-sm">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        ref={inputEl}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
        onKeyUp={() => setSearchString(inputEl.current.value)}
      />
      <div className="mt-8">
        {videos.length !== 0 && (
          <ul className="border-b border-gray-400">
            {filteredVideos.map(video => (
              <li>
                <Link
                  href={`/play/${video.id}/`}
                  className="py-4 block border-t border-gray-400 no-underline hover:bg-gray-200"
                >
                  <b className="block leading-tight">{video.title}</b>
                  <span className="block text-sm italic mt-2">
                    {video.author}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {videos.length === 0 && <p>No videos found</p>}
      </div>
    </p>
  );
};

export default Recent;
