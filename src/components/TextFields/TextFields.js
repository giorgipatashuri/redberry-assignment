import React from 'react';
import './TextFields.scss';
const TextFields = ({ name, inputName, onInputChange, requirements, value, isError, ...props }) => {
  return (
    <div className={`textField ${isError ? 'fieldError' : ''}`} {...props}>
      <div>{name}</div>
      <div className='inputcontianer'>
        <input type='text' name={inputName} onChange={onInputChange} value={value} />
      </div>
      <p>{requirements}</p>
    </div>
  );
};

export default TextFields;
