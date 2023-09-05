import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import IconComponents from '../iconComponent/IconComponents.jsx';
import PropTypes from 'prop-types';

const CropperModal = ({
  imageSubmitHandler,
  selectImage,
  croppedImage,
  setCroppedImage,
  setOpenCropper,
}) => {
  const cropperRef = useRef(null);

  //Data URL을 Blob으로 변환
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const matches = arr[0].match(/:(.*?);/);
    const mime = matches && matches.length >= 2 ? matches[1] : null;

    // MIME 타입이 없을 때 크롭 리셋
    if (!mime) {
      const cropperInstance = cropperRef.current.cropper;
      cropperInstance.reset();
      return;
    }

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    // Data URL로 크롭된 이미지 가져오기
    const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
    // Blob으로 변환
    const blob = dataURLtoBlob(croppedDataURL);
    setCroppedImage(blob);
  };

  return (
    <Wrapper>
      <button className='backButton'>
        <IconComponents
          iconType='back'
          stroke='#FFF'
          width='20px'
          height='20px'
          onClick={() => setOpenCropper(false)}
        />
      </button>
      <button
        className='applyButton'
        onClick={() => imageSubmitHandler(croppedImage)}
      >
        확인
      </button>
      <div>
        <Cropper
          src={selectImage}
          crop={onCrop}
          ref={cropperRef}
          aspectRatio={1}
          viewMode={1}
          background={false}
          guides={false}
          data={{ width: '100%' }}
        />
      </div>
    </Wrapper>
  );
};

export default CropperModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  @media (max-width: 428px) {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
  @media (min-width: 429px) {
    width: 428px;
    height: 100vh;
    margin: 0 auto;
  }
  z-index: 1;

  button {
    position: absolute;
    background-color: transparent;
    border: none;
    color: #fff;
    z-index: 1;
    cursor: pointer;
  }

  .backButton {
    top: 20px;
    left: 20px;
  }

  .applyButton {
    top: 20px;
    right: 20px;
    font-size: 16px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

CropperModal.propTypes = {
  imageSubmitHandler: PropTypes.func.isRequired,
  selectImage: PropTypes.string.isRequired,
  croppedImage: PropTypes.object,
  setCroppedImage: PropTypes.func.isRequired,
  setOpenCropper: PropTypes.func.isRequired,
};
