import { h, Fragment } from 'preact';

const Legal = () => {
  return (
    <Fragment>
      <h1>Legal</h1>
      <div className="mt-8">
        <p>Responsible for the content of this website:</p>
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
        <h2 className="mt-4">Disclaimer</h2>
        <p className="mt-2">
          The texts and contents of this site were created with great care.
          Nevertheless, I cannot give any guarantee with regard to the
          correctness, accuracy, up-to-dateness, reliability and completeness of
          the information.
        </p>
      </div>
    </Fragment>
  );
};

export default Legal;
