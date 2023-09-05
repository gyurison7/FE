import { SearchResutContainer, ThumbNail, ThumbnailWrapper } from "./SearchContainer";
import PropTypes from 'prop-types';

function AlbumResults({ albumName, items, navigate }) {
    return (
      <SearchResutContainer>
        <p>{albumName}</p>
        <ThumbnailWrapper>
          {items.map((item) => (
            <ThumbNail
              key={item.groupId}
              src={item.thumbnailUrl}
              alt='thumbnail'
              onClick={() => navigate(`/albumpost/${item.groupId}`)}
            />
          ))}
        </ThumbnailWrapper>
      </SearchResutContainer>
    );
  }
  
  export default AlbumResults;

  AlbumResults.propTypes = {
    albumName: PropTypes.string,
    items: PropTypes.array,
    navigate: PropTypes.func,
  };
  