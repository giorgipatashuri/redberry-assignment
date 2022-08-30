import React from 'react';
import './Button.scss';
const Button = ({ children, ...props }) => {
  return (
    <button className='Btn' {...props}>
      {children}
    </button>
  );
};

export default Button;