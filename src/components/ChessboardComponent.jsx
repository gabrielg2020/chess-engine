import React, { useState, useEffect } from 'react';
import StatusComponent from './StatusComponent';
import Chessboard from 'chessboardjsx';
import { Chess }from 'chess.js';

const ChessboardComponent = () => {
  const [chess] = useState(new Chess());
  const [history, setHistory] = useState(chess.history({verbose: true}));
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [prevFen, setPrevFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [squareStyles, setSquareStyles] = useState({});

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

      setHistory(chess.history({verbose: true}));
    } catch(e) {
      setFen(prevFen)
    }
  };

  const highlightSquare = (square) => {
    const piece = chess.get(square);
    setSquareStyles({});
    
    // Check if selected piece is the correct color
    if (chess.turn() !== piece.color) return;

    // Highlight clicked square
    let highlightStyles = {[square]: { background: 'rgba(255, 255, 0, 0.4)' }}

    // Highlight available moves
    const moves = chess.moves({
      square,
      verbose: true
    });

    moves.forEach((move) => {
      let color = 'rgba(100, 255, 0, 0.4'
      if (move.flags === 'c'){
        color = 'rgba(255, 100, 0, 0.4'
      }

      highlightStyles = {
        ...highlightStyles,
        [move.to]: { background: color }
      }
    })

    setSquareStyles(highlightStyles);
  };

  return (
    <>
      <div>
        <Chessboard 
          draggable={true}
          onDrop={(move) => handleMove(move)}
          position={fen} // initial position in FEN
          onMouseOverSquare={(square) => highlightSquare(square)}
          squareStyles={squareStyles}
        />
      </div>
      <div>
        <StatusComponent 
          history={history}
          turn={chess.turn()}
          gameState={{
            'isCheckmate': chess.isCheckmate(),
            'isDraw': chess.isDraw(),
            'isInsufficientMaterial': chess.isInsufficientMaterial(),
            'isStalemate': chess.isStalemate(),
            'isThreefoldRepetition': chess.isThreefoldRepetition(),
            'isGameOver': chess.isGameOver()
          }}
        />
      </div>
    </>
    

      
  );
};

export default ChessboardComponent;