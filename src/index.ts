import '@common/a11y';
import { isDev } from '@common/helpers';
import './styles.css';
import './App';

isDev && document.body.classList.add('dev');
/*
!isDev &&
  'serviceWorker' in navigator &&
  navigator.serviceWorker.register('/service-worker.js');*/
