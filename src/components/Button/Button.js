import React from 'react';
import './Button.scss';
const Button = ({ children, onClick, ...props }) => {
  return (
    <button className='Btn' onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
