import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Layout from '../../layout';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import Button from '../../components/common/button/Button.jsx';
import Input from '../../components/common/input/Input.jsx';
import { postWrite } from '../../api/postMainApi.js';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';

function PostWrite() {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [file, setFile] = useState(null);
  const { id } = useParams();

  const [titleError, setTitleError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const storedGroupName = localStorage.getItem('groupName');
  const navigate = useNavigate();

  // 이미지 업로드 시간을 측정하기 위한 useRef 사용
  const uploadStartTimeRef = useRef(null);

  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // 이미지 업로드 시작 시간 기록
      uploadStartTimeRef.current = performance.now();

      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setTitleError(false);
    setThumbnailError(false);
    let validationPassed = true;
    if (!title) {
      setTitleError(true);
      validationPassed = false;
    }
    if (!file) {
      setThumbnailError(true);
      validationPassed = false;
    }
    if (!validationPassed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('imageUrl', file);
    formData.append('title', title);

    try {
      // 이미지 업로드 완료 시간 기록
      const uploadEndTime = performance.now();
      const uploadTime = uploadEndTime - (uploadStartTimeRef.current || 0);
      console.log('이미지 업로드 시간: ' + uploadTime + 'ms');
      await postWrite(id, formData, navigate);
    } catch (error) {
      // 오류 처리
      console.error('Error:', error);
    }

    setLoading(false);
  };
  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      <Form style={{ width: '100%' }} onSubmit={submitHandler}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            theme='underLine'
            placeholder='제목을 입력해주세요'
            bordercolor='#DDDDDD'
            color='#4C4C4C'
          />
          {titleError && <ErrorText>제목을 입력해주세요</ErrorText>}
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
              borderradius='none'
              bgcolor='#D9D9D9'
              onImageChange={changeHandler}
            >
              사진 추가하기
            </WriteImageUpload>
          )}
          {thumbnailError && <ErrorText>썸네일을 추가해주세요</ErrorText>}
        </div>
        <ButtonWrap>
          <Button
            size='large'
            type='submit'
            color='white'
            background={thumbnailUrl ? '#5873FE' : '#929292'}
          >
            게시하기
          </Button>
        </ButtonWrap>
      </Form>
    </Layout>
  );
}
export default PostWrite;
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
const ErrorText = styled.div`
  color: #ff7e62;
  font-size: 12px;
  padding-top: 5px;
`;
