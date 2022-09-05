import React from 'react';
import SecondLogo from '../../assets/secondLogo.png';
import { useNavigate } from 'react-router-dom';
import './Layout.scss';
const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className='wrapper'>
      <div className='goback' onClick={() => navigate('/')}></div>
      <div className='header'>
        <div>
          თანამშრომლის ინფო
          {window.location.pathname === '/employeerInfo' && <div className='underline'></div>}
        </div>
        <div>
          ლეპტოპის მახასიათებლები
          {window.location.pathname === '/leptopInfo' && <div className='underline'></div>}
        </div>
      </div>
      <section>{children}</section>
      <img src={SecondLogo} alt='logo' className='secondLogo' />
    </div>
  );
};

export default Layout;
