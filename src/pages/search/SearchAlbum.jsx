import { styled } from 'styled-components';
import { SearchResutContainer } from './SearchContainer';
import PropTypes from 'prop-types';

function AlbumResults({ items, navigate }) {
  return (
    <SearchResutContainer>
      <AlbumContainer>
        {items.map((item) => (
          <AlbumWrapper key={item.groupId}>
            <Content>
              <ThumbNail
                src={item.thumbnailUrl}
                alt='thumbnail'
                onClick={() => navigate(`/postmain/${item.groupId}`)}
              />
              <TextContainer>
                <Text>
                  <Title> {item.groupName} </Title>
                  <Date> {item.startDate}</Date>
                  <Place> Name, Name , Name</Place>
                </Text>
              </TextContainer>
            </Content>
          </AlbumWrapper>
        ))}
      </AlbumContainer>
    </SearchResutContainer>
  );
}

export default AlbumResults;

const AlbumContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: red;
`;

const AlbumWrapper = styled.div`
  background-color: yellow;
  align-items: center;
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
  position: relative;
  align-items: center;
  left: 0;
  justify-items: center;
`;

const Text = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
`;

const Title = styled.text`
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
`;

const Date = styled.text`
    font-size: 14px;
    font-weight: 500;
`

const Place = styled.text`
    
`

AlbumResults.propTypes = {
  items: PropTypes.array,
  navigate: PropTypes.func,
};
