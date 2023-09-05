import React from 'react';
import PropTypes from 'prop-types';
import { SearchResutContainer, ThumbNail, ThumbnailWrapper } from './SearchContainer';


function PlaceResults({ items, navigate }) {
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
  
  export default PlaceResults;
  

PlaceResults.propTypes = {
    items: PropTypes.array,
    navigate: PropTypes.func,
  };
