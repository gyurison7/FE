import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='loading-container'>
      <div className='boxes'>
        <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
