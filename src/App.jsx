import { useEffect, useState } from "react";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import { calculateDraw, calculateWinner, getNextTurn } from "./utils/game";
import {
  loadBoardFromStorage,
  loadTurnFromStorage,
  resetGameStorage,
  saveGameToStorage,
} from "./utils/storage";
import "./App.css";

const EMPTY_BOARD = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(() =>
    loadBoardFromStorage(
      (value) => {
        if (!Array.isArray(value) || value.length !== 9) {
          return EMPTY_BOARD;
        }

        return value;
      },
      () => EMPTY_BOARD,
    )(),
  );

  const [turn, setTurn] = useState(() =>
    loadTurnFromStorage(
      (value) => (value === "X" || value === "O" ? value : "X"),
      () => "X",
    )(),
  );

  const winner = calculateWinner(board);
  const isDraw = !winner && calculateDraw(board);

  useEffect(() => {
    saveGameToStorage({
      board,
      turn,
    });
  }, [board, turn]);

  const handleSquareClick = (index) => {
    // Don't allow moves after the game has ended
    if (winner || isDraw) {
      return;
    }

    // Don't allow a player to overwrite a square
    if (board[index]) {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = turn;

    setBoard(newBoard);
    setTurn(getNextTurn(turn));
  };

  const handleReset = () => {
    setBoard(EMPTY_BOARD);
    setTurn("X");
    resetGameStorage();
  };

  return (
    <main className="game">
      <h1>Tic-Tac-Toe</h1>

      <GameStatus winner={winner} isDraw={isDraw} turn={turn} />

      <Board board={board} onSquareClick={handleSquareClick} />

      <button type="button" className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </main>
  );
}

export default App;
