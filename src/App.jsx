// @flow

import { render, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import SelectVideo from '@app/SelectVideo';
import Player from '@app/Player';
import Legal from '@app/pages/Legal';
import Privacy from '@app/pages/Privacy';
import About from '@app/pages/About';
import Logo from '@app/global/Logo';
import { matomoInit, matomoSetPage } from '@app/vendor/matomo';

const App = () => {
  const [videoID: string, setVideoID] = useState('');
  const [currentUrl: string, setCurrentUrl] = useState('');
  useEffect(() => {
    matomoInit();
  }, []);

  return (
    <div className="w-full max-w-md">
      <Link className="" href="/" activeClassName="">
        <Logo className="w-1/5 mx-auto" />
        <p className="text-2xl font-bold text-center mb-8 mt-2">
          YouTube Audio
        </p>
      </Link>
      <Router
        onChange={({ url, previous }) => {
          previous && matomoSetPage(url);
          setCurrentUrl(url);
        }}
      >
        <Legal path="/legal/" />
        <Privacy path="/privacy/" />
        <About path="/about/" />
        <SelectVideo currentUrl={currentUrl} default />
      </Router>
      <Router>
        <Player path="/play/:videoID" />
      </Router>
      <footer className="fixed left-0 top-0 w-full z-10">
        <nav className="flex justify-end text-xs mt-2">
          <Link
            href="/"
            className="ml-2 mr-auto leading-none text-gray-500 hover:text-black"
            activeClassName=""
          >
            Search Audio
          </Link>
          {[/*'About',*/ 'Legal', 'Privacy'].map(e => (
            <Link
              href={`/${e.toLowerCase().replace(/\s/g, '-')}/`}
              className="mr-2 leading-none text-gray-500 hover:text-black"
              activeClassName=""
            >
              {e}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
