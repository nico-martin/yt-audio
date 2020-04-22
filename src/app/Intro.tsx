import React from 'react';
import './Intro.css';
import Logo from './global/Logo';

const Intro = () => (
  <div className="intro">
    <Logo className="intro__logo" />
    <p className="intro__text">An audio player for YouTube videos</p>
  </div>
);

export default Intro;
