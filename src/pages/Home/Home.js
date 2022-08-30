import React from 'react';
import Button from '../../components/Button/Button';
import './Home.scss';
import mainImg from '../../assets/meinredberry.png';
import logo from '../../assets/logo.png';
const Home = () => {
  return (
    <div className='container'>
      <div>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <img src={mainImg} alt='meinredberry' className='meinredberry' />
        <div className='buttons_container'>
          <button>ჩანაწერის დამატება</button>
          <Button>test</Button>
          <button>ჩანაწერების სია</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
