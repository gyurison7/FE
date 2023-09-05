import React, { useEffect, useState } from 'react';
import api from '../../api/index.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../layout/index.js';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Input from '../../components/common/input/Input.jsx';
import Button from '../../components/common/button/Button.jsx';

export default function PostEdit() {
  const navigate = useNavigate();
  const { groupId, memoryId } = useParams();
  const [editData, setEditData] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedImage, setEditedImage] = useState(null); // 추가: 이미지를 저장하는 상태
  console.log(editedImage);
  useEffect(() => {
    api
      .get(`/group/${groupId}/memory/${memoryId}/update`, {
        withCredentials: true,
      })
      .then((res) => {
        setEditData(res.data);
        setEditedTitle(res.data.data.title);
      });
  }, [groupId, memoryId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 추가: 이미지 업로드 API 요청 보내기
    const formData = new FormData();
    formData.append('title', editedTitle);
    if (editedImage) {
      formData.append('imageUrl', editedImage);
    }

    api
      .put(`/group/${groupId}/memory/${memoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate(`/postmain/${groupId}`);
      })
      .catch((error) => {
        console.error('수정 실패:', error);
      });
  };

  // 추가: 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setEditedImage(selectedImage);
  };

  return (
    <Layout>
      <Form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
        <Top>
          <IconComponents
            iconType='vectorLeft'
            stroke='#4C4C4C'
            onClick={() => navigate(-1)}
          />
          <Title>
            <span>게시하기</span> <p>게시하기</p>
          </Title>
          <div></div>
        </Top>
        <div style={{ padding: '0px 24px 0px 24px' }}>
          <Input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            theme='underLine'
            placeholder='제목을 입력해주세요'
            bordercolor='#DDDDDD'
            color='#4C4C4C'
          />
        </div>
        <div style={{ marginTop: '28px' }}>
          <div style={{ position: 'relative' }}>
            {editedImage ? (
              <ThumbedImage
                src={URL.createObjectURL(editedImage)}
                alt='Uploaded Thumbnail'
              />
            ) : editData ? (
              <ThumbedImage src={editData?.data.imageUrl} alt='Uploaded Thumbnail' />
            ) : (
              <WriteImageUpload
                height='40.6vh'
                bgcolor='#D9D9D9'
                onFileChange={handleImageChange} // 추가: 파일 변경 핸들러 연결
              >
                사진 추가하기
              </WriteImageUpload>
            )}
            <ImageInput type='file' accept='image/*' onChange={handleImageChange} />{' '}
            {/* 추가: 파일 선택 입력 필드 */}
          </div>
        </div>
        <ButtonWrap>
          <Button size='large' type='submit' color='white' background='#5873FE'>
            게시하기
          </Button>
        </ButtonWrap>
      </Form>
    </Layout>
  );
}

// 나머지 스타일드 컴포넌트 및 컴포넌트 import 등은 이전과 동일

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  padding: 54px 25px 0 25px;
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
  filter: brightness(60%);
  object-fit: cover;
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
const ButtonWrap = styled.div`
  padding-top: 142px;

  display: flex;
  justify-content: center;
`;
