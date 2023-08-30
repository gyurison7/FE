import React from 'react';
import './LoadingSpinner.css';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../../recoil/Atom';

const LoadingSpinner = () => {
  const isLoading = useRecoilValue(loadingState);
  if(!isLoading) return null;
  
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
