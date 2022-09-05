import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordItem from '../../components/RecordItem/RecordItem';
import './List.scss';
const List = () => {
  const [leptopList, setleptopList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://pcfy.redberryinternship.ge/api/laptops?token=8f329f6dd19fd1905b19a5571745ee88',
    })
      .then(function ({ data }) {
        setleptopList(data.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <h1 className='listHeader'>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h1>
      <div className='goback' onClick={() => navigate('/')}></div>
      <div className='listContainer'>
        {leptopList.map((item) => (
          <RecordItem
            key={item.laptop.id}
            id={item.laptop.id}
            name={item.user.name}
            surname={item.user.surname}
            CpuName={item.laptop.name}
            imgSrc={item.laptop.image}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
