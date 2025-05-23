import React from 'react';
import { useLocation } from 'react-router-dom';
import './Readmore.css';

function Readmore() {
  const location = useLocation();
  const { newsItem } = location.state || {};

  return (
    <div className="news-container">
      <div className="news-content">
        <h1 className="news-title">{newsItem?.title || 'TEST NEWS'}</h1>
        
        <div className="news-body">
          <p className="news-text-large">TEST TEST TEST</p>
          <p className="news-text">TEST</p>
        </div>
        
        <div className="news-footer">
          <p className="news-date">Published on: 3/7/2025</p>
        </div>
      </div>
    </div>
  );
}

export default Readmore;