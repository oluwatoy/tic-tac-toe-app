function GameStatus({ winner, isDraw, turn }) {
  if (winner) {
    return <h2>Winner: {winner}</h2>;
  }

  if (isDraw) {
    return <h2>It's a draw!</h2>;
  }

  return <h2>Turn: {turn}</h2>;
}

export default GameStatus;
