import React from 'react';
import Card from './Card';
import '../styles/CardGrid.css';

export default function CardGrid({ cards, onCardClick, loading }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Catching Pokémon...</p>
      </div>
    );
  }

  return (
    <main className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onCardClick={onCardClick}
        />
      ))}
    </main>
  );
}
