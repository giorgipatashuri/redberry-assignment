import React, { useEffect, useState } from 'react';
import axios from 'axios';
import arrowDown from '../../assets/arrowdown.svg';
import './Select.scss';
const DropDown = ({ name = '', data, onClick, ...props }) => {
  const [isVisible, setisVisible] = useState(false);
  return (
    <div {...props} className='select_container' onClick={() => setisVisible(!isVisible)}>
      <div className='select_name'>
        {name}
        <img src={arrowDown} alt='arrow-down' />
      </div>

      {isVisible && (
        <div className='select_option_container'>
          {data.map((opt) => (
            <div key={opt.id} className='select_option' onClick={() => onClick(opt)}>
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
