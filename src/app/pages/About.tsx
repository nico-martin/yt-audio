import React from 'react';
import Helmet from 'react-helmet';
import app from '../../../app.json';

const About = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} page`}>
      <Helmet>
        <title>About - {app.title}</title>
      </Helmet>
      <h1 className="page__header">About</h1>
      <p>
        <br />
        <b>An audio player for YouTube videos</b>
      </p>
      <div className="page__content">
        <p>
          YTAudio is a progressive web app that allows you to listen to YouTube
          videos in the background. It runs in the browser and uses modern
          browser-interfaces (like the MediaSession API, the Web Share API and
          the Share Target API) in combination with a ServiceWorker and a Web
          App Manifest to deliver an App-Like User Experience.
        </p>
        <p>
          Read more about the project on{' '}
          <a
            href="https://dev.to/nicomartin/how-to-create-a-progressive-audio-player-with-react-hooks-31l1"
            target="_blank"
            rel="noopener"
          >
            dev.to
          </a>
          .
        </p>
        <h2>The Author</h2>
        <p>
          YTAudio was created by{' '}
          <a href="https://nico.dev" target="_blank">
            Nico Martin
          </a>
          , a freelance frontend developer from switzerland.
        </p>
        <h2>The Code</h2>
        <p>
          The aim of the project was to familiarise myself with some new browser
          APIs and provide an example of how they can be used to build app-like
          web applications that combine all the advantages of the web and all
          the advantages of native apps. The code is of course open source:
        </p>
        <p>
          <a
            href="https://github.com/nico-martin/yt-audio"
            target="_blank"
            rel="noopener"
          >
            https://github.com/nico-martin/yt-audio
          </a>
        </p>
        <p>
          For the backend I built a small node service that extracts the audio
          track of a youtube video and returns it to the frontend.
          Unfortunately, the service is somewhat error-prone. If you have an
          idea how to improve this, I'd be happy to look at your PR:
        </p>
        <p>
          <a
            href="https://github.com/nico-martin/yt-audio-source"
            target="_blank"
            rel="noopener"
          >
            https://github.com/nico-martin/yt-audio-source
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
