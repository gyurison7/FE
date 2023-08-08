import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';


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

  
  const groupNameHandler = (e)=>{
    setGroupName(e.target.value)
  }

  const placeHandler = (e) =>{
    setPlace(e.target.value)
  }

  const placeButtonHandler = ()=>{
    const newPlaces = place;
    setPlaces(prevPlaces =>  [...prevPlaces, newPlaces]);
    setPlace('')
  }

  const startDateHandler = (e)=>{
    setStartDate(e.target.value)
  }

  const endDateHandler = (e)=>{
    setEndDate(e.target.value)
  }

  const participantsHandler = (e)=>{
    setParticipant(e.target.value)
  }

  const deletePlaceHandler = (indexToDelete) => {
    setPlaces(prevPlaces => prevPlaces.filter((_, index) => index !== indexToDelete));
}

  const navigate = useNavigate();
  const backButtonHandler = ()=>{
    navigate("/groupmain")
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
                    type='text' 
                    value={groupName} 
                    placeholder='그룹 이름을 입력해주세요'
                    onChange={groupNameHandler}/>
                </div>
                    <button>image</button>
                <div>
                    함께한 추억 장소
                    <input 
                    placeholder='장소' 
                    value={place}
                    onChange={placeHandler}
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
                    type="date"
                     placeholder='2023-08-02' 
                     value={startDate}
                     onChange={startDateHandler}
                     /> ~ 
                    <input 
                    type="date"
                     placeholder='2023-08-03'
                     value={endDate}
                     onChange={endDateHandler} />
                </div>
                <div>
                    함께한 친구들
                    <input 
                    placeholder='친구 아이디' 
                    value={participants}
                    onChange={participantsHandler}/>
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