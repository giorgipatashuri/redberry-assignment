import React from 'react';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import mainImg from '../../assets/meinredberry.png';
import logo from '../../assets/logo.png';
import './Home.scss';
const Home = () => {
  let navigate = useNavigate();
  return (
    <div className='container'>
      <div>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <img src={mainImg} alt='meinredberry' className='meinredberry' />
        <div className='buttons_container'>
          <Button onClick={() => navigate('/employeerInfo')}>ჩანაწერის დამატება</Button>
          <Button>ჩანაწერების სია</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
