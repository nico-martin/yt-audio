import { h, VNode } from 'preact';
import { createPortal } from 'preact/compat';

import cn from 'classnames';

const container = document.getElementById('modals');

interface Props {
  title: string;
  onClose: Function;
  children: VNode | VNode[];
  width?: 'large' | 'medium' | 'small' | 'xsmall';
}

const Modal = ({ title, onClose, children, width = 'large' }: Props) => {
  return createPortal(
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50 cursor-pointer"
        onClick={() => onClose()}
      />
      <div
        className={cn(
          'bg-white w-11/12 mx-auto rounded shadow-lg z-50 overflow-y-auto',
          {
            'max-w-3xl': width === 'large',
            'max-w-2xl': width === 'medium',
            'max-w-md': width === 'small',
            'max-w-xs': width === 'xsmall',
          }
        )}
      >
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <h2>{title}</h2>
            <button
              onClick={() => onClose()}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    container
  );
};

export default Modal;
