import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

import cn from 'classnames';

const container = document.getElementById('modals');

interface Props {
  title: string;
  onClose: Function;
  children: any;
  width?: 'large' | 'medium' | 'small';
}

const Modal = ({ title, onClose, children, width = 'large' }: Props) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className={cn('modal__window', `modal__window--${width}`)}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button
            onClick={() => onClose()}
            className="modal-close modal__close"
          >
            <svg
              className="modal__close-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
      <div className="modal__background" onClick={() => onClose()} />
    </div>,
    container
  );
};

export default Modal;
