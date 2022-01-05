import React from 'react';
import classNames from 'classnames';

export default function Button({ onClick, className, children, outline }) {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}
