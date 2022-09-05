import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListItem.scss';
const ListItem = () => {
  const [laptopData, setLaptopData] = useState({});
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=8f329f6dd19fd1905b19a5571745ee88`,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function ({ data }) {
        setLaptopData(data.data);
        setDataLoaded(true);
        axios
          .get(`https://pcfy.redberryinternship.ge/api/teams`)
          .then(({ data }) => setTeams(data.data));
        axios
          .get(`https://pcfy.redberryinternship.ge/api/positions`)
          .then(({ data }) => setPositions(data.data));
        axios
          .get(`https://pcfy.redberryinternship.ge/api/brands`)
          .then(({ data }) => setBrands(data.data));
      })

      .catch(function (response) {
        console.log(response);
      });
  }, [id]);

  if (!dataLoaded) return <div>Loading</div>;
  const team = teams ? teams.find((team) => team.id === laptopData.user.team_id)?.name : '';
  const position = positions
    ? positions.find((team) => team.id === laptopData.user.position_id)?.name
    : '';
  const brand = brands ? brands.find((brand) => brand.id === laptopData.laptop.brand_id)?.name : '';
  return (
    <div className='detaildContainer'>
      <div className='userInfo'>
        <img
          className='laptopImage'
          src={'https://pcfy.redberryinternship.ge' + laptopData.laptop.image}
          alt='laptop image'
        />
        <div className='quest'>
          <ul>
            <li className='listTxt'>სახელი:</li>
            <li className='listTxt'>თიმი:</li>
            <li className='listTxt'>პოზიცია:</li>
            <li className='listTxt'>მეილი:</li>
            <li className='listTxt'>ტელ. ნომერი:</li>
          </ul>
        </div>
        <div className='answer'>
          <ul>
            <li className='answerTxt'>
              {laptopData.user.name} {laptopData.user.surname}
            </li>
            <li className='answerTxt'>{team}</li>
            <li className='answerTxt'>{position}</li>
            <li className='answerTxt'>{laptopData.user.email}</li>
            <li className='answerTxt'>{laptopData.user.phone_number}</li>
          </ul>
        </div>
      </div>
      <div className='line'></div>
      <div className='dataContainer'>
        <div className='userInfo'>
          <div className='quest'>
            <ul>
              <li className='listTxt'>ლეპტოპის სახელი:</li>
              <li className='listTxt'>ლეპტოპის ბრენდი:</li>
              <li className='listTxt'>RAM:</li>
              <li className='listTxt'>მეხსიერების ტიპი:</li>
            </ul>
          </div>
          <div className='answer'>
            <ul>
              <li className='answerTxt'>{laptopData.laptop.name}</li>
              <li className='answerTxt'>{brand}</li>
              <li className='answerTxt'>{laptopData.laptop.ram}</li>
              <li className='answerTxt'>{laptopData.laptop.hard_drive_type}</li>
            </ul>
          </div>
        </div>
        <div className='userInfo'>
          <div className='quest'>
            <ul>
              <li className='listTxt'>CPU:</li>
              <li className='listTxt'>CPU-ს ბირთვი:</li>
              <li className='listTxt'>CPU-ს ნაკადი:</li>
            </ul>
          </div>
          <div className='answer'>
            <ul>
              <li className='answerTxt'>{laptopData.laptop.cpu.name}</li>
              <li className='answerTxt'>{laptopData.laptop.cpu.cores}</li>
              <li className='answerTxt'>{laptopData.laptop.cpu.threads}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='line'></div>
      <div className='dataContainer'>
        <div className='userInfo'>
          <div className='quest'>
            <ul>
              <li className='listTxt'>ლეპტოპის მდგომარეობა:</li>
              <li className='listTxt'>ლეპტოპის ფასი:</li>
            </ul>
          </div>
          <div className='answer'>
            <ul>
              <li className='answerTxt'>
                {laptopData.laptop.state && laptopData.laptop.state === 'new' ? 'ახალი' : 'მეორადი'}
              </li>
              <li className='answerTxt'>{laptopData.laptop.price}</li>
            </ul>
          </div>
        </div>
        <div className='userInfo'>
          <div className='quest'>
            <ul>
              <li className='listTxt'>შევსების რიცხვი:</li>
            </ul>
          </div>
          <div className='answer'>
            <ul>
              <li className='answerTxt'>
                {laptopData.laptop.purchase_date || laptopData.laptop.purchase_date === null
                  ? 'უცნობია'
                  : laptopData.laptop.purchase_date}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
