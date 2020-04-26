import React from 'react';

const Privacy = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} page`}>
      <h1 className="page__header">Privacy</h1>
      <div className="page__content">
        <p>
          This webapp uses matomo analytics on https://analytics.sayhello.agency
          to obtain information about the use of the app. All information is
          collected anonymously and the{' '}
          <a href="http://donottrack.us" target="_blank" rel="noopener">
            DoNotTrack
          </a>{' '}
          header is respected.
        </p>
        <p>
          This page, as well as analytics.sayhello.agency, is hosted by cyon
          GmbH on servers in Basel (CH). Cyon automatically collects and stores
          information from your browser in so-called server log files. These
          are: IP address, date and time including time zone, browser request
          including origin of the request (referrer), operating system used
          including user interface and version, browser used including language
          and version, amount of data transferred.
        </p>
        <h2>Contact</h2>
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
      </div>
    </div>
  );
};

export default Privacy;
