import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { formDataContext } from '../../Context';

import TextFields from '../../components/TextFields/TextFields';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';

import './EmployeeInfo.scss';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const getFormValues = () => {
  const formValues = sessionStorage.getItem('UserData');
  if (!formValues) {
    return {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      team_id: '',
      position_id: '',
    };
  }
  return JSON.parse(formValues);
};
const getSelectValues = () => {
  const selectValues = sessionStorage.getItem('UserSelect');
  if (!selectValues) {
    return {
      team: {},

      position: {},
    };
  }
  return JSON.parse(selectValues);
};

const EmployeeInfo = () => {
  const [teams, setTeams] = useState({});
  const [positions, setPositions] = useState([]);
  const [data, setData] = useState(getFormValues);
  const [activeSelect, setActiveSelect] = useState(getSelectValues);
  const [selectErrors, setSelectErrors] = useState({
    teamError: false,
    positionError: false,
  });
  const [postData, setPostData] = useState({});
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const { setFormData } = useContext(formDataContext);
  useEffect(() => {
    axios
      .get(`https://pcfy.redberryinternship.ge/api/teams`)
      .then(({ data }) => setTeams(data.data));
    axios
      .get(`https://pcfy.redberryinternship.ge/api/positions`)
      .then(({ data }) => setPositions(data.data));
  }, []);
  useEffect(() => {
    sessionStorage.setItem('UserData', JSON.stringify(data));
    sessionStorage.setItem('UserSelect', JSON.stringify(activeSelect));
  }, [data, activeSelect]);
  const activeTeamSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      ...prevstate,
      position: {},
      team: opt,
    }));
    setSelectErrors((prevstate) => ({
      ...prevstate,
      teamError: false,
      positionError: false,
    }));
  };
  const activePositionSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      ...prevstate,
      position: opt,
    }));
  };
  const filterPositionsByteams = positions.filter((pos) => activeSelect.team.id === pos.team_id);
  const handleChange = (e) => {
    setData((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const onClickSelectCheck = () => {
    if (
      Object.keys(activeSelect.team).length == 0 &&
      Object.keys(activeSelect.position).length == 0
    ) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: true,
        positionError: true,
      }));
      return false;
    }
    if (Object.keys(activeSelect.team).length == 0) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: true,
      }));
      return false;
    }
    if (Object.keys(activeSelect.position).length == 0) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        positionError: true,
      }));
      return false;
    } else {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: false,
        positionError: false,
      }));
      return true;
    }
  };
  const onSuccesSubmit = () => {
    if (!onClickSelectCheck()) return;
    setData({
      ...data,
      team_id: activeSelect.position.team_id,
      position_id: activeSelect.position.id,
    });
    const postdata = {
      ...data,
      team_id: activeSelect.position.team_id,
      position_id: activeSelect.position.id,
    };
    sessionStorage.setItem('UserData', JSON.stringify(postdata));
    setFormData(postdata);
    navigate('/leptopInfo');
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSuccesSubmit)}>
        <div className='fullName'>
          <Controller
            control={control}
            defaultValue={data.name}
            name='name'
            rules={{ required: true, minLength: 2, pattern: { value: /^[ა-ჰ]+$/i } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='სახელი'
                inputName='name'
                value={data.name}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements='მინიმუმ 2 სიმბოლო, ქართული ასოები'
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={data.surname}
            name='surname'
            rules={{ required: true, minLength: 2, pattern: { value: /^[ა-ჰ]+$/i } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='გვარი'
                inputName='surname'
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                value={data.surname}
                requirements='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                isError={error}
              />
            )}
          />
        </div>
        <Select
          style={{ marginTop: '35px' }}
          name={activeSelect.team.name ? activeSelect.team.name : 'თიმი'}
          data={teams}
          onClick={activeTeamSelect}
          error={selectErrors.teamError}
        />
        <Select
          style={{ marginTop: '35px' }}
          name={activeSelect.position.name ? activeSelect.position.name : 'პოზიციები'}
          data={filterPositionsByteams}
          onClick={activePositionSelect}
          error={selectErrors.positionError}
        />
        <Controller
          control={control}
          name='email'
          defaultValue={data.email}
          rules={{
            required: true,
            pattern: {
              value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@redberry.ge$/,
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextFields
              name='მეილი'
              inputName='email'
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              value={field.value}
              requirements='უნდა მთავრდებოდეს @redberry.ge-თი'
              style={{ width: '100%', marginTop: '35px' }}
              isError={error}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={data.phone_number}
          name='phone_number'
          rules={{ required: true, pattern: { value: /\+(995)\d{3}\d{3}\d{3}$/ } }}
          render={({ field, fieldState: { error } }) => (
            <TextFields
              name='ტელეფონის ნომერი'
              inputName='phone_number'
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              value={field.value}
              requirements='უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'
              style={{ width: '100%', marginTop: '35px' }}
              isError={error}
            />
          )}
        />

        <div className='btn_container'>
          <Button
            onClick={() => {
              onClickSelectCheck();
            }}
            style={{ width: '175px', marginTop: '85px', marginBottom: '20px' }}>
            შემდეგი
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default EmployeeInfo;
