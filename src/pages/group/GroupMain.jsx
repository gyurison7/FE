import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import GroupPageHeader from "../../layout/header/GroupPageHeader";
import Footer from "../../layout/footer/Footer.jsx";
import { getGroupData } from "../../api/groupMainApi";
// import Footer from "../../layout/footer/Footer";

function GroupMain() {
  const [groupData, setGroupData] = useState([]);
  const navigate = useNavigate();
  const writeButtonHandler = () => {
    navigate("/groupwrite");
  };

  // groupdata 가져오기
  useEffect(() => {
      getGroupData()
      .then((data) => {
        console.log(data)
        setGroupData(data);
        
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, []);

  return (
    <>
      <StMainContainer>
        <GroupPageHeader />
        <StGroupWrapper datalength={groupData.length}>
          <StButtonWrapper>
            <StWriteButton onClick={writeButtonHandler}>
              <PlusImage
                src={`${process.env.PUBLIC_URL}/assets/image/plusimg.png`}
                alt="logo"
              />
            </StWriteButton>
          </StButtonWrapper>
          {/* {groupData.map((item) => (
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
          ))} */}
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
  justify-content: ${(props) =>
    props.datalength > 0 ? "space-around" : "flex-start"};
  margin-top: 80px;
  overflow-y: auto;
  flex-grow: 1;
  margin-left: ${(props) => (props.datalength > 0 ? "0px" : "24px")};
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

const PlusImage = styled.img``;
