import React from "react";

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
      <h1>{checkGameState()}</h1>
    </div>
  );
});

export default StatusComponent;
