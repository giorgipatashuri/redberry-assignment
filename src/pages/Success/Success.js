import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import suc from '../../assets/suc.png';
import Button from '../../components/Button/Button';
import './Success.scss';
const Success = () => {
  const navigate = useNavigate();
  return (
    <div className='successPage'>
      <div className='successContent'>
        <img src={suc} alt='' />
        <h1>ჩანაწერი დამატებულია!</h1>
        <Button onClick={() => navigate('/List')}>სიაში გადაყვანა</Button>
        <div onClick={() => navigate('/List')}>მთავარი</div>
      </div>
    </div>
  );
};

export default Success;
