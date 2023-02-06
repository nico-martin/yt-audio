import React from 'react';
import Helmet from 'react-helmet';
import './Page.css';
import app from '../../../app.json';

const Legal = ({ className = '' }: { className?: string }) => (
  <div className={`${className} page`}>
    <Helmet>
      <title>Legal - {app.title}</title>
    </Helmet>
    <h1 className="page__header">Legal</h1>
    <div className="page__content">
      <p>Responsible for the content of this website:</p>
      <p>Nico Martin</p>
      <p>
        Say Hello GmbH
        <br />
        Thunstrasse 4
        <br />
        3700 Spiez
      </p>
      <p>
        <a href="mailto:nico@sayhello.ch">nico@sayhello.ch</a>
      </p>
      <h2>Disclaimer</h2>
      <p>
        The texts and contents of this site were created with great care.
        Nevertheless, I cannot give any guarantee with regard to the
        correctness, accuracy, up-to-dateness, reliability and completeness of
        the information.
      </p>
    </div>
  </div>
);

export default Legal;
