import { useState } from "react";
import { Board } from "./Components/Board";
import { Panel } from "./Components/Panel";

import "./App.scss";
import { getPlayer, getWinner } from "./utils";

export const App = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentBoard = history[moveCount];
  const [winner] = getWinner(currentBoard);
  const isGameCompleted = moveCount > 8 || winner;
  const nextPlayer = getPlayer(moveCount + 1);

  const resetBoard = () => {
    setMoveCount(0);
    setHistory([Array(9).fill(null)]);
  };

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, moveCount + 1), nextSquares];
    setHistory(nextHistory);
    setMoveCount(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => () => {
    setMoveCount(nextMove);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="winner">
          {isGameCompleted
            ? `${winner || "Nobody"} wins`
            : `${nextPlayer}'s turn`}
        </div>

        <Board board={currentBoard} onPlay={handlePlay} />
      </div>

      <Panel history={history} jumpTo={jumpTo} resetBoard={resetBoard} />
    </div>
  );
};
