// @flow

import './App.jsx';
import './styles.css';
import { isDev } from '@app/vendor/helpers';

isDev && document.body.classList.add('dev');

'serviceWorker' in navigator &&
  navigator.serviceWorker.register('/service-worker.js');
