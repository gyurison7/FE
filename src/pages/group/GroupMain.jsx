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
    navigate(`/groupwrite`);
  };

  // groupdata 가져오기
  useEffect(() => {
    getGroupData()
      .then((data) => {
        setGroupData(data.findMyGroupData);
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, []);
  console.log(groupData);

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
          {groupData.map((item) => {
            const formattedStartDate = item.startDate.slice(0, 10);
            const formattedEndDate = item.endDate.slice(0, 10);

            return (
              <StButtonWrapper
                key={item.groupId}
                onClick={() => navigate(`/postmain/${item.groupId}`)}
              >
                <div
                  style={{
                    width: "100%",
                    height: "170px",
                    border: "none",
                    borderRadius: "12px",
                    backgroundImage: `url(${item.thumbnailUrl})`,
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
                  <h4> {item.groupName}</h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      marginTop: "12px",
                    }}
                  >
                    <p>{formattedStartDate}~{formattedEndDate}</p>
                  </p>
                </div>
              </StButtonWrapper>
            );
          })}
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
  margin-top: 80px;
  overflow-y: auto;
  flex-grow: 1;
  column-gap: 10vw;
  margin-left: 33px;
`;
const StButtonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
  cursor: pointer;
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
