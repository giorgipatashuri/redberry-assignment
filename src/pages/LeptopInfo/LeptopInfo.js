import React, { useState } from 'react';
import { useRef } from 'react';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import './LeptopInfo.scss';
const LeptopInfo = () => {
  const [imgLink, setImgLink] = useState('');
  const [imgData, setImgData] = useState({
    name: '',
    size: 0,
  });
  const [drag, setDrag] = useState(false);
  const inputFileRef = useRef(null);
  const imageHandler = (e) => {
    const test = URL.createObjectURL(e.target.files[0]);
    const formData = new FormData();

    formData.append('img', e.target.files[0]);
    setImgLink(test);
    // console.log(str_arr[str_arr.length - 1]);
    console.log('img', formData);
  };
  const dragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    const imgUrl = URL.createObjectURL(e.dataTransfer.files[0]);
    setImgLink(imgUrl);
  };

  const handleChangeFile = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImgLink(imgUrl);
    setImgData({
      name: e.target.files[0].name,
      size: e.target.files[0].size / 1024,
    });
    console.log(e.target.files[0]);
  };
  return (
    <Layout>
      <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
      {imgLink ? (
        <>
          <img src={imgLink} alt='img' className='choosenImage' />
          <div className='imgContent'>
            <span>name</span>
            <Button onClick={() => inputFileRef.current.click()}>ატვირთე</Button>
          </div>
        </>
      ) : (
        <div
          className='imageUploader'
          onDragStart={(e) => dragStart(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDragOver={(e) => dragStart(e)}
          onDrop={(e) => onDropHandler(e)}>
          <span>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
          <Button onClick={() => inputFileRef.current.click()}>ატვირთე</Button>
        </div>
      )}
    </Layout>
  );
};

export default LeptopInfo;
