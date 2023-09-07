import { styled } from 'styled-components';
import PropTypes from 'prop-types';

function AlbumResults({ items, navigate }) {
  return (
    <ResultContainer>
      <AlbumContainer>
        {items.map((item) => {
          const startDate = item.startDate.slice(0, 10).replace(/-/g, '.');
          const endDate = item.endDate.slice(0, 10).replace(/-/g, '.');
          let placesArray = [];

          if (item.place) {
            placesArray = JSON.parse(item.place);
          }

          return (
            <AlbumWrapper key={item.groupId}>
              <Content onClick={() => navigate(`/postmain/${item.groupId}`)}>
                <ThumbNail src={item.thumbnailUrl} alt='thumbnail' />
                <TextContainer>
                  <Text>
                    <Title> {item.groupName} </Title>
                    <Date>
                      {startDate} - {endDate}
                    </Date>
                    <Place> {placesArray.join(', ')} </Place>
                  </Text>
                </TextContainer>
              </Content>
            </AlbumWrapper>
          );
        })}
      </AlbumContainer>
    </ResultContainer>
  );
}

export default AlbumResults;

const ResultContainer = styled.div`
  width: 100%;
`;

const AlbumContainer = styled.div`
  width: 100%;
`;

const AlbumWrapper = styled.div`
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  /* :hover {
    background-color: rgba(76, 76, 76, 0.1);
  } */
`;

const Content = styled.div`
  display: flex;
`;
const ThumbNail = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 5px;
  object-fit: cover;
  margin: 20px 15px 20px 24px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 2px;
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  padding-bottom: 8px;
`;

const Place = styled.p`
  font-size: 14px;
  color: #666;
`;

AlbumResults.propTypes = {
  items: PropTypes.array,
  navigate: PropTypes.func,
};
