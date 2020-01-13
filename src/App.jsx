// @flow

import { render, h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import SelectVideo from '@app/components/SelectVideo';
import Player from '@app/components/Player';
import Legal from '@app/components/pages/Legal';
import Privacy from '@app/components/pages/Privacy';
import About from '@app/components/pages/About';
import Recent from '@app/components/Recent';
import Logo from '@app/components/global/Logo';

const parsedUrl = new URL(window.location);

const App = () => {
  const [videoID: string, setVideoID] = useState(
    parsedUrl.searchParams.get('v') === null
      ? ''
      : parsedUrl.searchParams.get('v')
  );

  return (
    <div className="w-full max-w-md">
      <Link className="" href="/">
        <Logo className="w-1/5 mx-auto" />
        <p className="text-2xl font-bold text-center mb-8 mt-2">
          YouTube Audio
        </p>
      </Link>
      <Router>
        <Legal path="/legal/" />
        <Privacy path="/privacy/" />
        <About path="/about/" />
        <Recent path="/recent/" />
        <SelectVideo setVideoID={id => setVideoID(id)} default />
      </Router>
      <Router>
        <Player path="/play/:videoID" />
      </Router>
      <footer className="fixed bottom-0 left-0 z-50 w-full">
        <nav className="flex p-4 text-xs items-center justify-around w-full max-w-xs mx-auto">
          <Link href="/about/">About</Link>
          <Link href="/legal/">Legal</Link>
          <Link href="/privacy/">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
