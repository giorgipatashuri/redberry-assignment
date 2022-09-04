import React from 'react';
import { useParams } from 'react-router-dom';
import suc from '../../assets/suc.png';
import Button from '../../components/Button/Button';
import './Success.scss';
const Success = () => {
  const params = useParams();
  console.log();
  return (
    <div className='successPage'>
      <div className='successContent'>
        <img src={suc} alt='' />
        <h1>ჩანაწერი დამატებულია!</h1>
        <Button>სიაში გადაყვანა</Button>
        <div>მთავარი</div>
      </div>
    </div>
  );
};

export default Success;
