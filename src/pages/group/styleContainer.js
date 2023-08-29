import { styled } from 'styled-components';

export const DivHeaderText = styled.p`
  margin-top: 12px;
  margin-bottom: 2px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #4c4c4c;
`;

export const SelectFrindWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectFrindRemover = styled.button`
  position: absolute;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: #fff;
  background-color: transparent;
  top: 0;
  right: 0;
`;

export const ProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 100%;
`;

export const WriteHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: #fff;
  align-items: center;
`;

export const WriteBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const StDateWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const GroupWriteInput = styled.input`
  width: 100%;
  height: 44px;
  padding-right: 50px;
  border-radius: 7px;
  background-color: #f5f5f5;
  border: none;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c2c2c2;
    font-size: 15px;
    font-style: normal;
    line-height: normal;
  }
`;
export const PlaceContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const PlaceInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 7px;

  .inputIcon {
    margin-right: 8px;
    margin-left: 10px;
    margin-top: 7px;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  background-color: transparent;
  color: rgba(88, 115, 254, 1);
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  margin-right: 20px;
`;

export const BackButton = styled.button`
  margin-left: 20px;
  background-color: transparent;
  border: none;
  position: relative;
  top: 5px;
`;

export const WriteImageWrapper = styled.div`
  width: 100%;
`;

export const ThumbedImage = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  border-radius: 7px;
`;

export const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
`;

export const PlaceResult = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  height: 30px;
  display: inline-flex;
  background-color: #5873fe;
  border-radius: 20px;
  color: #fff;
  padding: 8px 4px 8px 10px;
  font-size: 13px;
  align-items: center;
`;

export const PlaceRemoveButton = styled.button`
  padding-top: 2px;
  align-items: center;
  border: none;
  background-color: transparent;
`;

export const PlaceAddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

// FriendSearch Button styledcomponent
export const FriendSearchButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  background-color: rgba(245, 245, 245, 1);
`;

export const FriendSearchImage = styled.img`
  width: 20px;
  height: 20px;
`;

export const FriendContentWrap = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  gap: 9px;
`;

export const FriendSearchText = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #c2c2c2;
`;

export const Form = styled.form`
  width: 100%;
`;

export const DateInput = styled.input`
  width: 100%;
  height: 44px;
  padding-right: 50px;
  border-radius: 7px;
  background-color: #f5f5f5;
  border: none;
`;

export const DateInputWraper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 7px;

  .inputIcon {
    margin-right: 8px;
    margin-left: 10px;
    margin-top: 7px;
  }
`;

export const TitleWraper = styled.div`
  position: relative;
  width: 100%;
`;

export const WordCount = styled.div`
  margin: -9px 0px 0px;
  position: absolute;
  line-height: 19px;
  font-size: 14px;
  right: 0px;
  top: 68%;
  color: rgb(130, 140, 148);
`;

export const ErrorText = styled.div`
  color: #ff7e62;
  font-size: 12px;
  padding-top: 5px;
  padding-left: 6px;
`;
