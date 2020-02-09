import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import db from './store';
import { Link } from 'preact-router/match';
import { Video } from './vendor/types';

interface Props {
  searchString: string;
}

const Recent = ({ searchString }: Props) => {
  const [videos, setVideos] = useState<Array<Partial<Video>>>([]);
  const [filteredVideos, setFilteredVideos] = useState<Array<Partial<Video>>>(
    []
  );
  const removeVideo = id => {
    setVideos([...videos].filter(video => video.id !== id));
    db.delete(id);
  };

  useEffect(() => {
    db.getAll().then(resp => {
      const v = resp.sort((a, b) => b.date.getTime() - a.date.getTime());
      setVideos(v);
      setFilteredVideos(v);
    });
  }, []);

  useEffect(
    () =>
      setFilteredVideos(
        videos.filter(video => {
          return (
            (video.id || '').indexOf(searchString) !== -1 ||
            (video.author || '').indexOf(searchString) !== -1 ||
            (video.title || '').indexOf(searchString) !== -1
          );
        })
      ),
    [videos, searchString]
  );

  if (filteredVideos.length === 0) {
    return <p />;
  }

  return (
    <p className="text-left mt-8">
      <h3 className="text-sm">recently listened</h3>
      <div className="mt-4">
        <ul className="border-b border-gray-400">
          {filteredVideos.map(video => (
            <li className="relative">
              <Link
                href={`/play/${video.id}/`}
                className="py-2 block text-left w-full border-t border-gray-400 no-underline hover:bg-gray-200"
                activeClassName=""
              >
                <b className="block leading-tight text-sm text-gray-800 font-semibold">
                  {video.title}
                </b>
                <span className="block text-xs italic mt-1">
                  {video.author}
                </span>
              </Link>
              <button
                className="c-close text-gray-400 hover:text-black text-xs"
                onClick={() => {
                  if (confirm('Do you want to remove this video?')) {
                    removeVideo(video.id);
                  }
                }}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </p>
  );
};

export default Recent;
