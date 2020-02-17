import { render, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, Route } from 'preact-router';
import { Link } from 'preact-router/match';

import SelectVideo from './app/SelectVideo';
import Audio from './app/Audio';
import Legal from './app/pages/Legal';
import Privacy from './app/pages/Privacy';
import About from './app/pages/About';
import Logo from './app/global/Logo';

import { matomoSetPage } from './app/vendor/matomo';

const App = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  return (
    <div className="w-full max-w-md">
      <Link className="" href="/" activeClassName="">
        <Logo className="w-1/5 mx-auto" style={{ maxWidth: 80 }} />
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
        <Route path="/legal/" component={Legal} />
        <Route path="/privacy/" component={Privacy} />
        <Route path="/about/" component={About} />
        <Route default currentUrl={currentUrl} component={SelectVideo} />
      </Router>
      <Router>
        <Route path="/play/:videoID" component={Audio} />
      </Router>
      <footer className="fixed left-0 top-0 w-full z-10">
        <nav className="flex justify-end text-xs mt-2">
          <Link
            href="/"
            className="ml-2 mr-auto leading-none text-gray-700 hover:text-black"
            activeClassName=""
          >
            Home
          </Link>
          {[/*'About',*/ 'Legal', 'Privacy'].map(e => (
            <Link
              href={`/${e.toLowerCase().replace(/\s/g, '-')}/`}
              className="mr-2 leading-none text-gray-700 hover:text-black"
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
