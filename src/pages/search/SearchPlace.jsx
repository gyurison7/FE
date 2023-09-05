import React from 'react';
import PropTypes from 'prop-types';
import { SearchResutContainer, ThumbNail, ThumbnailWrapper } from './SearchContainer';


function PlaceResults({ placeName, items, navigate }) {
    return (
      <SearchResutContainer>
        <p>{placeName}</p>
        <ThumbnailWrapper>
          {items.map((item) => (
            <ThumbNail
              key={item.groupId}
              src={item.thumbnailUrl}
              alt='thumbnail'
              onClick={() => navigate(`/placepost/${item.groupId}`)}
            />
          ))}
        </ThumbnailWrapper>
      </SearchResutContainer>
    );
  }
  
  export default PlaceResults;
  

PlaceResults.propTypes = {
    placeName: PropTypes.string,
    items: PropTypes.array,
    navigate: PropTypes.func,
  };
