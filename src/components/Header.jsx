import React from 'react';
import '../styles/Header.css';

export default function Header({ currentScore, bestScore }) {
  return (
    <header className="game-header">
      <div className="title-container">
        <h1>⚡ PokéMemory ⚡</h1>
        <p>Get points by clicking on an image, but don't click on any more than once!</p>
      </div>
      <div className="scoreboard">
        <div className="score-box current">
          <span>Score</span>
          <strong>{currentScore}</strong>
        </div>
        <div className="score-box best">
          <span>Best Score</span>
          <strong>{bestScore}</strong>
        </div>
      </div>
    </header>
  );
}
