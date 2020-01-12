// @flow

import './App.jsx';
import './styles.css';
import { isDev } from '@vendor/helpers';

isDev && document.body.classList.add('dev');
