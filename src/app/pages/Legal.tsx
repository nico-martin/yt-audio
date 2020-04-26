import React from 'react';
import './Page.css';

const Legal = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} page`}>
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
};

export default Legal;
