import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';


function GroupWrite() {







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
                    <input />
                </div>
                    <button>image</button>
                <div>
                    함께한 추억 장소
                    <input placeholder='지역' />
                </div>
                <div>
                    함께한 추억 기간
                    <input type="date" placeholder='2023-08-02' /> ~ 
                    <input type="date" placeholder='2023-08-03' />
                </div>
                <div>
                    함께한 친구들
                    <input placeholder='친구 아이디' />
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