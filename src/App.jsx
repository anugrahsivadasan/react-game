import React, { useState, useEffect } from 'react';
import './App.css';

const GRID_SIZE = 4; // 4x4 grid for a 15-puzzle game
const EMPTY_TILE = GRID_SIZE * GRID_SIZE;

function App() {
  const [tiles, setTiles] = useState([]);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    initializeTiles();
  }, []);

  const initializeTiles = () => {
    const shuffledTiles = [...Array(EMPTY_TILE).keys()].sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
    setIsWin(false);
  };

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(EMPTY_TILE - 1);
    const rowDiff = Math.abs(Math.floor(emptyIndex / GRID_SIZE) - Math.floor(index / GRID_SIZE));
    const colDiff = Math.abs((emptyIndex % GRID_SIZE) - (index % GRID_SIZE));

    if (rowDiff + colDiff === 1) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      checkWin(newTiles);
    }
  };

  const checkWin = (tiles) => {
    const isSolved = tiles.every((tile, index) => tile === index);
    setIsWin(isSolved);
  };

  return (
    <div className="app">
      <h1>Sliding Puzzle Game</h1>
      <div className="grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === EMPTY_TILE - 1 ? 'empty' : ''}`}
            onClick={() => moveTile(index)}
          >
            {tile !== EMPTY_TILE - 1 && tile + 1}
          </div>
        ))}
      </div>
      <button onClick={initializeTiles} className="reset-button">Reset</button>
      {isWin && <p className="win-message">Congratulations! You've solved the puzzle!</p>}
    </div>
  );
}

export default App;
