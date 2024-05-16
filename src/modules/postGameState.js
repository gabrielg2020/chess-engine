import { Chess } from 'chess.js';

export const postGameState = async(chess) => {
  const board = chess.board();
  const boardJson = JSON.stringify(board)

  try {
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: boardJson,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Board state sent successfully:', result);
    } else {
      console.error('Failed to send board state');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};