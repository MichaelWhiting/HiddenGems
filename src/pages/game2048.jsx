import React, { useState, useEffect } from 'react';
import '../CSS/2048.css'; // Assuming you have a CSS file for styling

function Game2048() {
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill(0)));

  // Function to initialize the game board with two random tiles
  const initializeBoard = () => {
    const newBoard = [...board];
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
  };

  // Function to add a random tile (2 or 4) to a random empty cell
  const addRandomTile = (board) => {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[x][y] = Math.random() < 0.9 ? 2 : 4; // 90% chance of spawning a 2, 10% chance of spawning a 4
    }
  };

  // Function to handle key presses for moving tiles
  const handleKeyPress = (event) => {
    const newBoard = [...board];
    switch (event.key) {
      case 'ArrowUp':
        moveUp(newBoard);
        break;
      case 'ArrowDown':
        moveDown(newBoard);
        break;
      case 'ArrowLeft':
        moveLeft(newBoard);
        break;
      case 'ArrowRight':
        moveRight(newBoard);
        break;
      default:
        return;
    }
    setBoard(newBoard);
  };

  // Function to move tiles upwards
  const moveUp = (board) => {
    // Implement logic to move tiles up
  };

  // Function to move tiles downwards
  const moveDown = (board) => {
    // Implement logic to move tiles down
  };

  // Function to move tiles to the left
  const moveLeft = (board) => {
    // Implement logic to move tiles left
  };

  // Function to move tiles to the right
  const moveRight = (board) => {
    // Implement logic to move tiles right
  };

  // Function to start a new game
  const newGame = () => {
    initializeBoard();
  };

  // useEffect to initialize the game when the component mounts and add event listeners
  useEffect(() => {
    initializeBoard();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game-container">
      <h1>2048</h1>
      {/* Render the game board */}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell cell-${cell}`}>{cell !== 0 ? cell : ''}</div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export default Game2048;