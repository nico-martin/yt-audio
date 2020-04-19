import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { videosDB } from './store';
import { Link } from 'preact-router/match';
import { Video } from './vendor/types';
import './Recent.css';

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
    videosDB.delete(id);
  };

  useEffect(() => {
    videosDB.getAll().then(resp => {
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
    <div className="recent">
      <h3 className="recent__title">recently listened</h3>
      <ul className="recent__list">
        {filteredVideos.map(video => (
          <li className="recent__element recent-element">
            <Link
              href={`/play/${video.id}/`}
              className="recent-element__link"
              activeClassName=""
            >
              {video.images[video.images.length - 1].url && (
                <div className="recent-element__image">
                  <img
                    src={video.images[video.images.length - 1].url}
                    width={video.images[video.images.length - 1].width}
                    height={video.images[video.images.length - 1].height}
                    alt={`Thumbnail for ${video.title} by ${video.author}`}
                  />
                </div>
              )}
              <div className="recent-element__about">
                <h4 className="recent-element__title">{video.title}</h4>
                <span className="recent-element__author">{video.author}</span>
              </div>
            </Link>
            <button
              className="recent-element__remove"
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
  );
};

export default Recent;
