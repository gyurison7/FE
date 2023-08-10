import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import GroupPageHeader from "../../layout/header/GroupPageHeader";
import Footer from "../../layout/footer/Footer.jsx";
// import Footer from "../../layout/footer/Footer";

function GroupMain() {
  const navigate = useNavigate();
  const writeButtonHandler = () => {
    navigate("/groupwrite");
  };



  const data = [
    {
      id: 1,
      memoryName: "찐친즈 모임",
      date: "2023.08.01~2023.08.14",
      img: "https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp",
    },
    {
      id: 2,
      memoryName: "멍청이와 아이들",
      date: "2023.08.01~2023.08.14",
      img: "https://youmatter.world/app/uploads/sites/2/2019/11/travel-cities-man.jpg",
    },
    {
      id: 3,
      memoryName: "스위스를 좋아하는",
      date: "2023.08.01~2023.08.14",
      img: "https://www.libertytravel.com/sites/default/files/styles/full_size/public/Groups%20Product%20Tiles-Celebrations-1262x500.jpg?itok=t8BTk2fJ",
    },
    {
      id: 4,
      memoryName: "강원도에서 스키",
      date: "2023.08.01~2023.08.14",
      img: "https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp",
    },
    {
      id: 5,
      memoryName: "제주도 민박",
      date: "2023.08.01~2023.08.14",
      img: "https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp",
    },
    {
      id: 6,
      memoryName: "제주도 민박",
      date: "2023.08.01~2023.08.14",
      img: "https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp",
    },
    {
      id: 7,
      memoryName: "제주도 민박",
      date: "2023.08.01~2023.08.14",
      img: "https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp",
    },
  ];

  return (
    <>
      <StMainContainer>
        <GroupPageHeader />
        <StGroupWrapper datalength={data.length}>
          <StButtonWrapper>
            <StWriteButton onClick={writeButtonHandler}> + </StWriteButton>
          </StButtonWrapper>
          {data.map((item) => (
            <StButtonWrapper key={item.id}>
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                style={{
                  lineHeight: "1px",
                  paddingLeft: "12px",
                  marginTop: "12px",
                }}
              >
                <h4> {item.memoryName}</h4>
                <p
                  style={{
                    fontSize: "12px",
                    color: "gray",
                    marginTop: "12px",
                  }}
                >
                  {item.date}
                </p>
              </div>
            </StButtonWrapper>
          ))}
        </StGroupWrapper>
        <Footer />
      </StMainContainer>
    </>
  );
}

export default GroupMain;

//container and wrapper
const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`; 

const StGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.datalength > 0 ? 'space-around' : 'flex-start'};
  margin-top: 80px;
  overflow-y: auto;
  flex-grow: 1;
  margin-left: ${props => props.datalength > 0 ? '0px' : '24px'};
`;
const StButtonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
`;

//styled
const StWriteButton = styled.button`
  width: 100%;
  height: 170px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 50px;
  color: white;
  background-color: rgba(88, 115, 254, 1);
`;
