import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess }from 'chess.js';

const ChessboardComponent = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [prevFen, setPrevFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

  useEffect(() => {
    setPrevFen(fen);
  }, [fen]);

  const handleMove = ({ sourceSquare, targetSquare, piece }) => {
    try {
        const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      setPrevFen(fen)
      setFen(chess.fen());
    } catch(e) {
      setFen(prevFen)
    }
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