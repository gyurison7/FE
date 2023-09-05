import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchResutContainer,
  ThumbNail,
  ThumbnailWrapper,
} from './SearchContainer';

function PlaceResults({ slicedDate, day, items, navigate }) {
  return (
    <SearchResutContainer>
      <p>{`${slicedDate} (${day})`}</p>
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
  slicedDate: PropTypes.string,
  day: PropTypes.string,
  items: PropTypes.array,
  navigate: PropTypes.func,
};
