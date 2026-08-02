import React from 'react';

function Card({ id, name, image, handleClick }) {
  return (
    <div 
      className="card" 
      onClick={() => handleClick(id)}
    >
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <p className="card-title">{name}</p>
    </div>
  );
}

export default Card;
