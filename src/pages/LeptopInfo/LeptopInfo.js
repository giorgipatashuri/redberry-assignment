import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { formDataContext } from '../../Context';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import Select from '../../components/Select/Select';
import TextFields from '../../components/TextFields/TextFields';
import './LeptopInfo.scss';
import { Navigate, useNavigate } from 'react-router-dom';
const getFormData = () => {
  const formValues = sessionStorage.getItem('UserData');
  if (!formValues) {
    return {
      fail: true,
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
const getFormValues = () => {
  const formValues = sessionStorage.getItem('LeptopData');
  if (!formValues) {
    return {
      laptop_name: '',
      laptop_cpu_cores: '',
      laptop_cpu_threads: '',
      laptop_hard_drive_type: '',
      laptop_ram: '',
      laptop_purchase_date: '',
      laptop_price: '',
      laptop_state: '',
    };
  }
  return JSON.parse(formValues);
};
const getSelectValues = () => {
  const selectValues = sessionStorage.getItem('LeptopSelect');
  if (!selectValues) {
    return {
      laptop_cpu: {
        name: '',
      },
      brand: {},
    };
  }
  return JSON.parse(selectValues);
};
const LeptopInfo = () => {
  const [imgLink, setImgLink] = useState('');
  const [imgData, setImgData] = useState({
    img: null,
    name: '',
    size: 0,
    error: false,
  });
  const [data, setData] = useState(getFormValues);
  const [dataFromEmployeer, setdataFromEmployeer] = useState(getFormData);
  const [cpus, setCpus] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activeSelect, setActiveSelect] = useState(getSelectValues);
  const [selectErrors, setSelectErrors] = useState({
    cpuError: false,
    brandError: false,
  });
  const [radioErrors, setRadioErrors] = useState({
    memoryError: false,
    stateError: false,
  });
  const inputFileRef = useRef(null);
  const { register, handleSubmit, control } = useForm();
  const { formData } = useContext(formDataContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`https://pcfy.redberryinternship.ge/api/cpus`).then(({ data }) => setCpus(data.data));
    axios
      .get(`https://pcfy.redberryinternship.ge/api/brands`)
      .then(({ data }) => setBrands(data.data));
  }, []);
  useEffect(() => {
    sessionStorage.setItem('LeptopSelect', JSON.stringify(activeSelect));
    sessionStorage.setItem('LeptopData', JSON.stringify(data));
  }, [data, activeSelect]);
  const handleChange = (e) => {
    setData((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const activeCpuSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      ...prevstate,
      laptop_cpu: opt,
    }));
  };
  const activeBrandSelect = (opt) => {
    setActiveSelect((prevstate) => ({
      ...prevstate,
      brand: opt,
    }));
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    const imgUrl = URL.createObjectURL(e.dataTransfer.files[0]);
    setImgLink(imgUrl);
    setImgData({
      img: e.dataTransfer.files[0],
      name: e.dataTransfer.files[0].name,
      size: Math.round(e.dataTransfer.files[0].size / 1024),
    });
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImgLink(imgUrl);
    setImgData({
      img: e.target.files[0],
      name: e.target.files[0].name,
      size: Math.round(e.target.files[0].size / 1024),
    });
  };
  const onClickCheck = () => {
    let isError = false;
    if (!imgData.name) {
      setImgData((prevstate) => ({
        ...prevstate,
        error: true,
      }));
      isError = true;
    }
    if (
      Object.keys(activeSelect.laptop_cpu).length === 0 &&
      Object.keys(activeSelect.brand).length === 0
    ) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        cpuError: true,
        brandError: true,
      }));
      isError = true;
    }
    if (Object.keys(activeSelect.laptop_cpu).length == 0) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        cpuError: true,
      }));
      isError = true;
    }
    if (Object.keys(activeSelect.brand).length == 0) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        brandError: true,
      }));
      isError = true;
    }
    if (!activeSelect.laptop_cpu.name) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        cpuError: true,
      }));
    }
    if (!activeSelect.laptop_cpu.name) {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        cpuError: true,
      }));
    }
    if (!data.laptop_hard_drive_type && !data.laptop_state) {
      setRadioErrors({
        memoryError: true,
        stateError: true,
      });
      isError = true;
    }
    if (!data.laptop_hard_drive_type) {
      setRadioErrors((prevstate) => ({
        ...prevstate,
        memoryError: true,
      }));
      isError = true;
    }
    if (!data.laptop_state) {
      setRadioErrors((prevstate) => ({
        ...prevstate,
        stateError: true,
      }));
      isError = true;
    } else {
      setSelectErrors((prevstate) => ({
        ...prevstate,
        cpuError: false,
        brandError: false,
      }));
      isError = false;
    }
    return isError;
  };
  const onSuccesSubmit = () => {
    if (!onClickCheck) return;
    const fd = new FormData();
    const dataFromStorage = dataFromEmployeer.fail ? formData : dataFromEmployeer;
    const sendData = {
      token: '8f329f6dd19fd1905b19a5571745ee88',
      laptop_brand_id: activeSelect.brand.id,
      laptop_cpu: activeSelect.laptop_cpu.name,
      ...dataFromStorage,
      ...data,
      laptop_image: imgData.img,
    };
    Object.keys(sendData).forEach((key) => fd.append(key, sendData[key]));
    console.log(fd);
    axios({
      method: 'post',
      url: 'https://pcfy.redberryinternship.ge/api/laptop/create',
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        navigate('/Success');
        sessionStorage.clear();
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSuccesSubmit)}>
        <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
        {imgLink ? (
          <>
            <img src={imgLink} alt='img' className='choosenImage' />
            <div className='imgContent'>
              <span>
                {imgData.name} {imgData.size}mb
              </span>
              <Button onClick={() => inputFileRef.current.click()}>ატვირთე</Button>
            </div>
          </>
        ) : (
          <div
            className={`imageUploader ${imgData.error ? 'fileUpdateError' : ''}`}
            onDrop={(e) => onDropHandler(e)}>
            <span>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
            <Button
              onClick={(e) => {
                inputFileRef.current.click();
                e.preventDefault();
              }}>
              ატვირთე
            </Button>
          </div>
        )}
        <div className='leptopName'>
          <Controller
            control={control}
            defaultValue={data.laptop_name}
            name='laptop_name'
            rules={{ required: true, pattern: { value: /^[a-zA-Z0-9$@$!%*?&#()^-_. +=]+$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                style={{ minWidth: '420px' }}
                name='ლეპტოპის სახელი'
                inputName='laptop_name'
                value={data.laptop_name}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements='ლათინური ასოები, ციფრები, !@#$%^&*()_+= '
              />
            )}
          />
          <Select
            style={{ width: '60%' }}
            name={activeSelect.brand.name ? activeSelect.brand.name : 'brand'}
            data={brands}
            onClick={activeBrandSelect}
            error={selectErrors.brandError}
          />
        </div>

        <div className='line'></div>
        <div className='leptopCpu'>
          <Select
            style={{ width: '300px' }}
            name={activeSelect.laptop_cpu.name ? activeSelect.laptop_cpu.name : 'CPU'}
            data={cpus}
            onClick={activeCpuSelect}
            error={selectErrors.cpuError}
          />
          <Controller
            control={control}
            defaultValue={data.laptop_cpu_cores}
            name='laptop_cpu_cores'
            rules={{ required: true, pattern: { value: /^\d+$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                // style={{ minWidth: '420px' }}
                name='ლეპტოპის ბირთვები'
                inputName='laptop_cpu_cores'
                value={data.laptop_cpu_cores}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements='მხოლოდ ციფრები'
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={data.laptop_cpu_threads}
            name='laptop_cpu_threads'
            rules={{ required: true, pattern: { value: /^\d+$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                // style={{ minWidth: '420px' }}
                name='ლეპტოპის ნაკადი'
                inputName='laptop_cpu_threads'
                value={data.laptop_cpu_threads}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements='მხოლოდ ციფრები'
              />
            )}
          />
        </div>
        <div className='leptopMemory'>
          <Controller
            control={control}
            defaultValue={data.laptop_ram}
            name='laptop_ram'
            rules={{ required: true, pattern: { value: /^\d+$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='ლეპტოპის RAM(GB)'
                inputName='laptop_ram'
                value={data.laptop_ram}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements='მხოლოდ ციფრები'
              />
            )}
          />

          <div className={`radioBox ${radioErrors.memoryError ? 'radioBoxError' : ''}`}>
            <div className='radioName'>მეხსიერების ტიპი</div>
            <div className='radioOptions'>
              <div className={`radioWrapper`}>
                <input
                  name='laptop_hard_drive_type'
                  type='radio'
                  value='SSD'
                  onChange={handleChange}
                  checked={data.laptop_hard_drive_type === 'SSD'}
                />
                <label>SSD</label>
              </div>
              <div className={`radioWrapper`}>
                <input
                  name='laptop_hard_drive_type'
                  type='radio'
                  value='HDD'
                  onChange={handleChange}
                  checked={data.laptop_hard_drive_type === 'HDD'}
                />
                <label>HDD</label>
              </div>
            </div>
          </div>
        </div>
        <div className='line'></div>
        <div className='leptopState'>
          <Controller
            control={control}
            defaultValue={data.laptop_purchase_date}
            name='laptop_purchase_date'
            render={({ field, fieldState: { error } }) => (
              <TextFields
                type='date'
                name='შეძენის რიცხვი (არჩევითი)'
                inputName='laptop_purchase_date'
                value={data.laptop_purchase_date}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                isError={error}
                requirements=''
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={data.laptop_price}
            name='laptop_price'
            rules={{ required: true, pattern: { value: /^\d+$/ } }}
            render={({ field, fieldState: { error } }) => (
              <TextFields
                name='ლეპტოპის ფასი'
                inputName='laptop_price'
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                value={data.laptop_price}
                requirements='მხოლოდ ციფრები'
                isError={error}
              />
            )}
          />
        </div>
        <div className={`stateRadioBox ${radioErrors.stateError ? 'radioBoxError' : ''}`}>
          <div className='radioName'>ლეპტოპის მდგომარეობა</div>
          <div className='radioOptions'>
            <div className={`radioWrapper`}>
              <input
                name='laptop_state'
                type='radio'
                value='new'
                onChange={handleChange}
                checked={data.laptop_state === 'new'}
              />
              <label>ახალი</label>
            </div>
            <div className={`radioWrapper`}>
              <input
                name='laptop_state'
                type='radio'
                value='used'
                onChange={handleChange}
                checked={data.laptop_state === 'used'}
              />
              <label>მეორადი</label>
            </div>
          </div>
        </div>
        <div className='leptopPage-btn_container'>
          <div onClick={() => navigate('/employeerInfo')} className='back'>
            უკან
          </div>
          <Button onClick={() => onClickCheck()} style={{ width: '175px' }}>
            დამახსოვრება
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default LeptopInfo;
