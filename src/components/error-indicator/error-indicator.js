import React from 'react';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () =>{
  return(
      <div className="error-indicator">
          <img src={icon} alt="death star"/>
          <span className="boom">BOOM!</span>
          <span>
              something has gone wrong
          </span>
          <span>
              (but we already sent droids to fix it)
          </span>
      </div>
  )
};

export default ErrorIndicator;