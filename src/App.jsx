import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import './styles/App.css';

const POKEMON_IDS = [1, 4, 7, 25, 39, 52, 133, 143, 150, 214, 252, 384];

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Pokémon data on component mount
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const fetchedData = await Promise.all(
          POKEMON_IDS.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            return {
              id: data.id,
              name: data.name.toUpperCase(),
              image: data.sprites.other['official-artwork'].front_default,
            };
          })
        );
        setCards(shuffleArray(fetchedData));
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // 2. Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 3. Card click handler
  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      // Game Over: Reset current score & clicked history
      alert(`Game Over! You clicked the same Pokémon twice. Final Score: ${currentScore}`);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedIds([]);
    } else {
      // Valid Click: Increase score & update clicked list
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedIds((prev) => [...prev, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      if (newScore === POKEMON_IDS.length) {
        alert('🎉 Congratulations! You achieved a PERFECT score!');
        setCurrentScore(0);
        setClickedIds([]);
      }
    }

    // Shuffle cards every time a card is clicked
    setCards((prevCards) => shuffleArray(prevCards));
  };

  return (
    <div className="app">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} loading={loading} />
    </div>
  );
}