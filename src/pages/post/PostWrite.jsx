import React, { useState } from 'react';
import { uploadImage } from '../../api/uploadImage.js';
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
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = await uploadImage(file);
      const config = { imageUrl: url, title: title };
      await api.post(`/group/${id}/memory`, config, {
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
          <IconComponents iconType='back' onClick={() => navigate(-1)} />
          <Title>
            <span>게시하기</span> <p>Memory Mingle</p>
          </Title>
          <Button size='small' type='submit' color='white' background='#929292'>
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
          <WriteImageUpload
            height='40.6vh'
            bgcolor='#D7D7D7'
            onImageChange={changeHandler}
          >
            사진 추가하기
          </WriteImageUpload>
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
