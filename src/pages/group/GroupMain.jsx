import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import GroupPageHeader from "../../layout/header/GroupPageHeader";
import Footer from "../../layout/footer/Footer.js";
import { getGroupData } from "../../api/groupMainApi";

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

  return (
    <>
      <MainContainer>
        <GroupPageHeader />
        <GroupWrapper >
          <ButtonWrapper>
            <WriteButton onClick={writeButtonHandler}>
              <PlusImage
                src={`${process.env.PUBLIC_URL}/assets/image/plusimg.png`}
                alt="logo"
              />
            </WriteButton>
          </ButtonWrapper>
          {groupData.map((item) => {
               const formattedStartDate = item.startDate ? item.startDate.slice(0, 10) : "";
               const formattedEndDate = item.endDate ? item.endDate.slice(0, 10) : "";

            return (
              <ButtonWrapper
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
                    {formattedStartDate}~{formattedEndDate}
                  </p>
                </div>
              </ButtonWrapper>
            );
          })}
        </GroupWrapper>
        <Footer />
      </MainContainer>
    </>
  );
}

export default GroupMain;

//container and wrapper
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 80px;
  overflow-y: auto;
  flex-grow: 1;
  column-gap: 10vw;
  margin-left: 33px;
`;
const ButtonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
  cursor: pointer;
`;

//styled
const WriteButton = styled.button`
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
