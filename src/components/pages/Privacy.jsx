// @flow

import { h, Fragment } from 'preact';

const Privacy = () => {
  return (
    <Fragment>
      <h1>Privacy</h1>
      <div className="mt-8">
        <p>
          This webapp uses matomo analytics on https://analytics.sayhello.agency
          to obtain information about the use of the app. All information is
          collected anonymously and the{' '}
          <a href="http://donottrack.us" target="_blank" rel="noopener">
            DoNotTrack
          </a>{' '}
          header is respected.
        </p>
        <p className="mt-2">
          This page, as well as analytics.sayhello.agency, is hosted by cyon
          GmbH on servers in Basel (CH). Cyon automatically collects and stores
          information from your browser in so-called server log files. These
          are: IP address, date and time including time zone, browser request
          including origin of the request (referrer), operating system used
          including user interface and version, browser used including language
          and version, amount of data transferred.
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
