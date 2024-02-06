import '../Style/main.css';

import React from 'react';

const FeatureItem = ({ iconSrc, alt, title, description }) => {
  return (
    <div>
      <img src={iconSrc} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;