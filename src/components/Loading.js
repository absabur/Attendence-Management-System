'use client'
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner">
        <svg className="svg-spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      </div>
      <h2 className="loading-text">Please wait, loading...</h2>
    </div>
  );
};

export default Loading;

