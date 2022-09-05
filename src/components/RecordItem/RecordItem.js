import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecordItem.scss';
const RecordItem = ({ name, id, surname, imgSrc, CpuName }) => {
  const navigate = useNavigate();
  return (
    <div className='item'>
      <div className='computerImgContainer'>
        <img src={'https://pcfy.redberryinternship.ge/' + imgSrc} />
      </div>
      <div className='info'>
        <span className='userName'>
          {name} {surname}
        </span>
        <span className='cpuName'>{CpuName}</span>
        <div className='more' onClick={() => navigate('/list/' + id)}>
          მეტის ნახვა
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
