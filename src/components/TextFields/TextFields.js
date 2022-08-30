import React from 'react';
import './TextFields.scss';
const TextFields = ({
  name,
  inputName,
  onInputChange,
  requirements,
  value,
  error,
  isError = false,
  ...props
}) => {
  console.log(error);
  return (
    <div className={`textField ${error ? 'error' : ''}`} {...props}>
      <div>{name}</div>
      <input type='text' name={inputName} onChange={onInputChange} value={value} />
      <p>{requirements}</p>
    </div>
  );
};

export default TextFields;
