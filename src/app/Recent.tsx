import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@common/types';
import './Recent.css';
import { videosDB } from './store';

interface Props {
  searchString: string;
  Intro: any;
}

const Recent = ({ searchString, Intro }: Props) => {
  const [videos, setVideos] = React.useState<Array<Partial<Video>>>([]);
  const [filteredVideos, setFilteredVideos] = React.useState<
    Array<Partial<Video>>
  >([]);
  const [init, setInit] = React.useState<boolean>(false);
  const removeVideo = (id) => {
    setVideos([...videos].filter((video) => video.id !== id));
    videosDB.delete(id);
  };

  React.useEffect(() => {
    videosDB.getAll().then((resp) => {
      setInit(true);
      const v = resp.sort((a, b) => b.date.getTime() - a.date.getTime());
      setVideos(v);
      setFilteredVideos(v);
    });
  }, []);

  React.useEffect(
    () =>
      setFilteredVideos(
        videos.filter((video) => {
          return (
            (video.id || '').indexOf(searchString) !== -1 ||
            (video.author || '').indexOf(searchString) !== -1 ||
            (video.title || '').indexOf(searchString) !== -1
          );
        })
      ),
    [videos, searchString]
  );

  if (!init) {
    return <p />;
  }

  if (filteredVideos.length === 0) {
    return <Intro />;
  }

  return (
    <div className="recent">
      <h3 className="recent__title">recently listened</h3>
      <ul className="recent__list">
        {filteredVideos.map((video) => (
          <li className="recent__element recent-element">
            <Link to={`/play/${video.id}/`} className="recent-element__link">
              {video.images &&
                video.images.length !== 0 &&
                video.images[video.images.length - 1].url && (
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
