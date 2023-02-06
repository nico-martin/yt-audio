import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import {
  BrowserRouter,
  Route,
  Link,
  useLocation,
  Switch,
} from 'react-router-dom';
import './App.css';
import app from '../app.json';
import { version } from '../package.json';
import Audio from './app/Audio';
import Navigation from './app/Page/Navigation';
import SelectVideo from './app/SelectVideo';
import { matomoSetPage } from './app/common/matomo';
import Icon from './app/global/Icon';
import About from './app/pages/About';
import Legal from './app/pages/Legal';
import Privacy from './app/pages/Privacy';

const App: React.FC = () => {
  const location = useLocation();
  const [init, setInit] = React.useState<boolean>(false);

  React.useEffect(() => {
    init && matomoSetPage(location.pathname);
    if (location.pathname === '/') {
      document.body.classList.add('home');
    } else {
      document.body.classList.remove('home');
    }
    setInit(true);
  }, [location]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{app.title}</title>
        <meta name="app-version" content={version} />
      </Helmet>
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
      <div className="app__version">v. {version}</div>
    </React.Fragment>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app')
);
