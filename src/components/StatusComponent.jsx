import React from "react";
import '../styles/StatusComponent.css'

const StatusComponent = React.memo(({ history, turn, gameState }) => {
  const checkGameState = () => {
    if (!gameState.isGameOver) {
      return turn === 'b' ? "Black's Turn" : "White's Turn";
    } 

    if (gameState.isCheckmate) {
      return turn === 'b' ? "White Checkmated Black" : "Black Checkmated White";
    }

    return gameState.isInsufficientMaterial ? "Insufficient Material"
      : gameState.isStalemate ? "Stalemate"
      : gameState.isThreefoldRepetition ? "Threefold Repetition"
      : gameState.isDraw ? "Draw"
      : "Game Over!";
  }

  return (
    <div>
      <h1 className="game-state">{checkGameState()}</h1>
      <h2 className="title">Game History</h2>
      <div className="history-container">
        <ul>
          {history.map((move, index) => (
            <li key={index}>
            - {move.san}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default StatusComponent;
