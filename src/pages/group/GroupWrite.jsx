import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';

function GroupWrite() {
  const [groupName, setGroupName] = useState('');
  // const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipant] = useState([]);

  console.log('-------------------')
  console.log('groupName', groupName);
  console.log('place', places);
  console.log('startDate', startDate);
  console.log('endDate', endDate);
  console.log('participants', participants);

  const searchUser = async (nickname) => {
    try {
      const payload = { 
        "nickname": nickname 
      };
  
      const response = await api.post('/nickname', payload); 
      const userData = response.data;
  
      console.log(userData); 
  
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  const universalHandler = (e) => {
    const { name, value } = e.target;

    switch(name) {
        case "groupName":
            setGroupName(value);
            break;
        case "place":
            setPlace(value);
            break;
        case "startDate":
            setStartDate(value);
            break;
        case "endDate":
            setEndDate(value);
            break;
        case "participants":
            setParticipant(value);
            searchUser(value);
            break;
        default:
            break;
    }
}

  const deletePlaceHandler = (indexToDelete) => {
    setPlaces(prevPlaces => prevPlaces.filter((_, index) => index !== indexToDelete));
}

  const navigate = useNavigate();
  const backButtonHandler = ()=>{
    navigate("/groupmain")
  }

  const placeButtonHandler = ()=>{
    const newPlaces = place;
    setPlaces(prevPlaces =>  [...prevPlaces, newPlaces]);
    setPlace('')
  }



    return (
        <>
            <StWriteHeader>
                <div>
                    <button onClick={backButtonHandler}>back</button>
                </div>
                <div>
                    구룹 만들기
                </div>
                <div>
                    <button>확인</button>
                </div>
            </StWriteHeader>

            <StWriteBody>
                <div>
                    <input 
                    name='groupName'
                    type='text' 
                    value={groupName} 
                    placeholder='그룹 이름을 입력해주세요'
                    onChange={universalHandler}/>
                </div>
                    <button>image</button>
                <div>
                    함께한 추억 장소
                    <input 
                    name='place'
                    placeholder='장소' 
                    value={place}
                    onChange={universalHandler}
                    />
                    <button onClick={placeButtonHandler}> 추가</button>
                </div>
                <ul>
        {places.map((place, index) => (
            <li key={index}>
                {place} 
                <button onClick={() => deletePlaceHandler(index)}>삭제</button>
            </li>
        ))}
    </ul>
                <div>
                    함께한 추억 기간
                    <input 
                    name='startDate'
                    type="date"
                     placeholder='2023-08-02' 
                     value={startDate}
                     onChange={universalHandler}
                     /> ~ 
                    <input 
                    name='endDate'
                    type="date"
                     placeholder='2023-08-03'
                     value={endDate}
                     onChange={universalHandler} />
                </div>
                <div>
                    함께한 친구들
                    <input 
                    name='participants'
                    placeholder='친구 아이디' 
                    value={participants}
                    onChange={universalHandler}/>
                </div>
            </StWriteBody>
        
        </>
    )
}


export default GroupWrite;

const StWriteHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color: #f8f8f8;
    align-items: center;
`;

const StWriteBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;