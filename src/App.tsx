import { render, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, Route } from 'preact-router';
import { Link } from 'preact-router/match';

import Navigation from './app/Page/Navigation';
import SelectVideo from './app/SelectVideo';
import Audio from './app/Audio';
import Legal from './app/pages/Legal';
import Privacy from './app/pages/Privacy';
import About from './app/pages/About';
import Logo from './app/global/Logo';

import './App.css';

import { matomoSetPage } from './app/vendor/matomo';

const App = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  return (
    <div className="app">
      <header className="app__header">
        <Link href="/" className="app__logo" activeClassName="">
          <Logo title="YouTube Audio" />
        </Link>
        <Navigation className="app__navigation" />
      </header>
      <div className="app__content">
        {/*
      <Link className="" href="/" activeClassName="">
        <Logo className="w-1/5 mx-auto" style={{ maxWidth: 80 }} />
        <p className="text-2xl font-bold text-center mb-8 mt-2">
          YouTube Audio
        </p>
      </Link>
      */}
        <Router
          onChange={({ url, previous }) => {
            previous && matomoSetPage(url);
            setCurrentUrl(url);
          }}
        >
          <Route path="/legal/" component={Legal} />
          <Route path="/privacy/" component={Privacy} />
          <Route path="/about/" component={About} />
          <Route path="/play/:videoID" component={Audio} />
          <Route default currentUrl={currentUrl} component={SelectVideo} />
        </Router>
      </div>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
