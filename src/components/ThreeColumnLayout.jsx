import React from 'react';

const ThreeColumnLayout = ({ left, center, right }) => (
  <div className="three-col-layout">
    <div className="three-col left-col">{left}</div>
    <div className="three-col center-col">{center}</div>
    <div className="three-col right-col">{right}</div>
  </div>
);

export default ThreeColumnLayout; 