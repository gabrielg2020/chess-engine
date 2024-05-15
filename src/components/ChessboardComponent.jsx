import React from 'react';
import Chessboard from 'chessboardjsx';

const ChessboardComponent = () => {
  return (
    <div>
      <Chessboard 
        position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" // initial position in FEN
      />
    </div>
  );
};

export default ChessboardComponent;