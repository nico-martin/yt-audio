import React from 'react';
import './BufferInfo.css';

const BufferInfo = ({ onClose }: { onClose: Function }) => (
  <div className="buffer-info">
    <p>
      It looks like it's taking quite some time to buffer. I'm really sorry for
      this 😟. This app was only ment to be a little proof of concept and I
      guess the service that streams the audio is quite weak. If you want to
      help out, please get in touch with me:
    </p>
    <p>
      <a href="mailto:mail@nicomartin.ch">mail@nicomartin.ch</a>
    </p>
    <button onClick={() => onClose()} className="buffer-info__close">
      close
    </button>
  </div>
);

export default BufferInfo;
