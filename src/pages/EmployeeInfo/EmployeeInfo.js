import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextFields from '../../components/TextFields/TextFields';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import './EmployeeInfo.scss';

const getFormValues = () => {
  const Formvalues = sessionStorage.getItem('test');
  if (!Formvalues) {
    return {
      name: '',
      surname: '',
      mail: '',
      number: '',
    };
  }
  return JSON.parse(Formvalues);
};

const EmployeeInfo = () => {
  const [teams, setTeams] = useState({});
  const [positions, setPositions] = useState([]);
  const [data, setData] = useState(getFormValues);
  const [activeSelect, setActiveSelect] = useState({
    team: {},
    position: {},
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
    console.log(data);
    sessionStorage.setItem('test', JSON.stringify(data));
  }, [data]);
  const activeTeamSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      position: {},
      team: opt,
    }));
  };
  const activePositionSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      ...prevstate,
      position: opt,
    }));
  };
  console.log(positions);
  const filterPositionsByteams = positions.filter((pos) => activeSelect.team.id === pos.team_id);
  const handleChange = (e) => {
    setData((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (data) => {
    console.log(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='fullName'>
            <Controller
              control={control}
              name='name'
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextFields
                  name='სახელი'
                  inputName='name'
                  value={data.name}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  error={error}
                  requirements='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                />
              )}
            />
            <Controller
              control={control}
              name='surname'
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextFields
                  name='გვარი'
                  inputName='surname'
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  value={field.surname}
                  requirements='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                  error={error}
                />
              )}
            />
          </div>
          <Select
            style={{ marginTop: '35px' }}
            name={activeSelect.team.name ? activeSelect.team.name : 'თიმი'}
            data={teams}
            onClick={activeTeamSelect}
          />
          <Select
            style={{ marginTop: '35px' }}
            name={activeSelect.position.name ? activeSelect.position.name : 'პოზიციები'}
            data={filterPositionsByteams}
            onClick={activePositionSelect}
          />
          <Controller
            control={control}
            name='number'
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='number'
                inputName='number'
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                value={field.value}
                requirements='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                style={{ width: '100%', marginTop: '35px' }}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name='mail'
            rules={{ required: true }}
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
                error={error}
              />
            )}
          />

          <div className='btn_container'>
            <Button style={{ width: '175px', marginTop: '35px', float: 'right' }}>test</Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EmployeeInfo;
