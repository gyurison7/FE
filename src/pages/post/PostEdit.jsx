import React, { useEffect, useState } from 'react';
import api from '../../api/index.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../layout/index.js';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Input from '../../components/common/input/Input.jsx';
import Button from '../../components/common/button/Button.jsx';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';
import { uploadImage } from '../../api/imageUpload.js';

export default function PostEdit() {
  const navigate = useNavigate();
  const { groupId, memoryId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const storedGroupName = localStorage.getItem('groupName');

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const url = await uploadImage(editedImage);
      const config = {
        imageUrl: url,
        title: editedTitle,
      };
      await api.put(`/group/${groupId}/memory/${memoryId}`, config, {
        withCredentials: true,
      });
      navigate(`/postmain/${groupId}`);
    } catch (error) {
      console.error('수정 실패:', error);
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  };

  // 추가: 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setEditedImage(selectedImage);
  };

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      <Form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
        <Top>
          <div style={{ cursor: 'pointer' }}>
            <IconComponents
              iconType='iconX'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              stroke='#4C4C4C'
              onClick={() => navigate(-1)}
            />
          </div>
          <Title>
            <span>게시하기</span> <p>{storedGroupName}</p>
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
              <div style={{ position: 'relative' }}>
                <EditWrap htmlFor='imageInput'>
                  <IconComponents
                    iconType='editCamera'
                    width='19'
                    height='14'
                    viewBox='0 0 19 14'
                  />
                  <p>사진 변경하기</p>
                </EditWrap>
                <ThumbedImage
                  filter='brightness(60%)'
                  src={editData?.data.imageUrl}
                  alt='Uploaded Thumbnail'
                />
              </div>
            ) : (
              <WriteImageUpload
                height='40.6vh'
                bgcolor='#D9D9D9'
                onFileChange={handleImageChange} // 추가: 파일 변경 핸들러 연결
              >
                사진 추가하기
              </WriteImageUpload>
            )}
            <ImageInput
              type='file'
              accept='image/*'
              id='imageInput'
              onChange={handleImageChange}
            />
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
const EditWrap = styled.label`
  width: 114px;
  height: 32px;
  cursor: pointer;
  background: #4c4946;
  border-radius: 8.079px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 18px;
  left: 24px;
  gap: 7.5px;
  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
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
  filter: ${(props) => props.filter};
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
