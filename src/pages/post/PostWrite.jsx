import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Layout from '../../layout';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import Button from '../../components/common/button/Button.jsx';
import Input from '../../components/common/input/Input.jsx';
import api from '../../api/index.jsx';
function PostWrite() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const navigate = useNavigate();
  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageUrl', file);
    formData.append('title', title);
    try {
      await api.post(`/group/${id}/memory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      navigate(`/postmain/${id}`);
    } catch (error) {
      // 오류 처리
      console.error('Error:', error);
    }
  };
  return (
    <Layout>
      <Form style={{ width: '100%' }} onSubmit={submitHandler}>
        <Top>
          <IconComponents
            iconType='vectorLeft'
            stroke='#4C4C4C'
            onClick={() => navigate(`/postmain/${id}`)}
          />
          <Title>
            <span>게시하기</span> <p>Memory Mingle</p>
          </Title>
          <Button
            size='small'
            type='submit'
            color='white'
            background={thumbnailUrl ? '#5873FE' : '#929292'}
          >
            게시하기
          </Button>
        </Top>
        <div>
          <Input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            theme='underLine'
            placeholder='제목을 적어주세요'
            bordercolor='#DDDDDD'
            color='#4C4C4C'
          />
        </div>
        <div style={{ marginTop: '28px' }}>
          {thumbnailUrl ? (
            <div style={{ position: 'relative' }}>
              <ThumbedImage src={thumbnailUrl} alt='Uploaded Thumbnail' />
              <ImageInput type='file' accept='image/*' onChange={changeHandler} />
            </div>
          ) : (
            <WriteImageUpload
              height='40.6vh'
              bgcolor='#D7D7D7'
              onImageChange={changeHandler}
            >
              사진 추가하기
            </WriteImageUpload>
          )}
          {/* <WriteImageUpload
            height='40.6vh'
            bgcolor='#D7D7D7'
            onImageChange={changeHandler}
          >
            사진 추가하기
          </WriteImageUpload> */}
        </div>
      </Form>
    </Layout>
  );
}
export default PostWrite;
const Form = styled.form`
  padding: 56px 24px;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  text-align: center;
  span {
    color: #4c4c4c;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  p {
    color: #c3c3c3;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const ThumbedImage = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: cover;
  border-radius: 7px;
`;
const ImageInput = styled.input`
  position: absolute;
  top: 0;
  width: 100%;
  height: 40vh;
  border: 1px solid red;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;
