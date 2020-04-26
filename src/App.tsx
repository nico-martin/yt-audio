import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import Navigation from './app/Page/Navigation';
import SelectVideo from './app/SelectVideo';
import Audio from './app/Audio';
import Legal from './app/pages/Legal';
import Privacy from './app/pages/Privacy';
import About from './app/pages/About';

import './App.css';

import { matomoSetPage } from './app/vendor/matomo';
import Icon from './app/global/Icon';

const App = () => {
  const location = useLocation();
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    init && matomoSetPage(location.pathname);
    if (location.pathname === '/') {
      document.body.classList.add('home');
    } else {
      document.body.classList.remove('home');
    }
    setInit(true);
  }, [location]);

  return (
    <Fragment>
      <header className="app__header">
        <Link to="/" className="app__back">
          <Icon icon="arrow" /> back
        </Link>
        <Navigation className="app__navigation" />
      </header>
      <Switch>
        <Route path="/legal/">
          <Legal className="app__content" />
        </Route>
        <Route path="/privacy/">
          <Privacy className="app__content" />
        </Route>
        <Route path="/about/">
          <About className="app__content" />
        </Route>
        <Route path="/play/:videoID">
          <Audio className="app__content" />
        </Route>
        <Route path="/">
          <SelectVideo />
        </Route>
      </Switch>
    </Fragment>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#app')
);
