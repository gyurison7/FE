import { SearchResutContainer, ThumbNail, ThumbnailWrapper } from "./SearchContainer";
import PropTypes from 'prop-types';

function AlbumResults({ items, navigate }) {

    return (
      <SearchResutContainer>
        <ThumbnailWrapper>
          {items.map((item) => (
            <ThumbNail
              key={item.groupId}
              src={item.thumbnailUrl}
              alt='thumbnail'
              onClick={() => navigate(`/postmain/${item.groupId}`)}
            />
          ))}
        </ThumbnailWrapper>
      </SearchResutContainer>
    );
  }
  
  export default AlbumResults;

  AlbumResults.propTypes = {
    items: PropTypes.array,
    navigate: PropTypes.func,
  };
  