import React from 'react';
import SecondLogo from '../../assets/secondLogo.png';
const Layout = ({ children }) => {
  return (
    <div className='wrapper'>
      <div className='goback'></div>
      <div className='header'>
        <div>
          თანამშრომლის ინფო
          <div className='underline'></div>
        </div>
        <div>ლეპტოპის მახასიათებლები</div>
      </div>
      <section>{children}</section>
      <img src={SecondLogo} alt='logo' className='secondLogo' />
    </div>
  );
};

export default Layout;
