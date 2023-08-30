import React from 'react';
import './LoadingSpinner.css';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className='loading-container'>
      <div className='loadingio-spinner-spin-vi85b5q1hnp'>
        <div className='ldio-z3ecgm1rz7'>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
