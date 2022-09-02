import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextFields from '../../components/TextFields/TextFields';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import SecondLogo from '../../assets/secondLogo.png';
import './EmployeeInfo.scss';

const getFormValues = () => {
  const formValues = sessionStorage.getItem('UserData');
  if (!formValues) {
    return {
      name: '',
      surname: '',
      mail: '',
      number: '',
      team_id: '',
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
  const { register, handleSubmit, control } = useForm();
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
    console.log(opt);
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
      return setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: true,
        positionError: true,
      }));
    }
    if (Object.keys(activeSelect.team).length == 0) {
      return setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: true,
      }));
    }
    if (Object.keys(activeSelect.position).length == 0) {
      return setSelectErrors((prevstate) => ({
        ...prevstate,
        positionError: true,
      }));
    } else {
      return setSelectErrors((prevstate) => ({
        ...prevstate,
        teamError: false,
        positionError: false,
      }));
    }
    console.log('test');
  };
  const onSuccesSubmit = (data) => {
    console.log('success');
  };
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
      <section>
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
            name='mail'
            rules={{
              required: true,
              pattern: {
                value:
                  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@redberry.ge$/,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='მეილი'
                inputName='mail'
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
            name='number'
            rules={{ required: true, pattern: { value: /\+(995)\d{3}\d{3}\d{3}$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='ტელეფონის ნომერი'
                inputName='number'
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
              onClick={() => onClickSelectCheck()}
              style={{ width: '175px', marginTop: '85px' }}>
              test
            </Button>
          </div>
        </form>
      </section>
      <img src={SecondLogo} alt='logo' className='secondLogo' />
    </div>
  );
};

export default EmployeeInfo;
