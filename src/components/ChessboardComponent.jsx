import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess }from 'chess.js';

const ChessboardComponent = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')

  const handleMove = ({ sourceSquare, targetSquare, piece }) => {
    const game = chess;
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (move == null) return;
    setFen(game.fen());
  };

  return (
    <div>
      <Chessboard 
        draggable={true}
        onDrop={(move) => handleMove(move)}
        position={fen} // initial position in FEN
      />
    </div>
  );
};

export default ChessboardComponent;