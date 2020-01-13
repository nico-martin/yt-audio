// @flow

import { h, Fragment } from 'preact';

const Privacy = () => {
  return (
    <Fragment>
      <h1>Privacy</h1>
      <div className="mt-8">
        <p>
          This webapp does not collect any personal data besides what is either
          required to use the app or submitted explicitly. There are no tracking
          tools in use.
        </p>
        <h2 className="mt-4">Contact</h2>
        <p className="mt-2">Nico Martin</p>
        <p className="mt-2">
          Say Hello GmbH
          <br />
          Thunstrasse 4
          <br />
          3700 Spiez
        </p>
        <p className="mt-2">
          <a href="mailto:nico@sayhello.ch">nico@sayhello.ch</a>
        </p>
      </div>
    </Fragment>
  );
};

export default Privacy;
