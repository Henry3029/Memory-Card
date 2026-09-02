import React from 'react';

function Card({ card, onCardClick }) {
  return (
    <div 
      className="card" 
      onClick={() => onCardClick(card.id)}
    >
      <div className="card-image-container">
        <img src={card.image} alt={card.name} className="card-image" />
      </div>
      <p className="card-title">{card.name}</p>
    </div>
  );
}

export default Card;
