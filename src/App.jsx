import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";


/**
 * DEFAULT PLAYER NAME
 */
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

/**
 * DEFAULT BLANK GAME BOARD ARRAY
 * DO NOT MUTATE IT
 * INSTEAD USE DEEP COPY ONE
 */
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * STORE ACTIVE PLAYER FUNCTION
 * BASED ON THE STATE (= gameTurns)
 */
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

/**
 * UPDATE GAME BOARD INFO FUNCTION
 * BASED ON THE STATE (= gameTurns)
 */
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

/**
 * STORE WINNER FUNCTION
 */
const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol].toUpperCase();
    }
  }

  return winner;
}

// =====================================================================

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // Update player data
  const activePlayer = deriveActivePlayer(gameTurns);

  // Update game board data
  const gameBoard = deriveGameBoard(gameTurns);

  // Checking whether winner condition is satisfied or not
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  /**
   * STORE GAME BOARD INFO FUNCTION
   * EVERYTIME ONE OF THE PLAYERS CLICK A BUTTON
   */
  const selectSquareHandler = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  /**
   * RESTART GAME FUNCTION
   */
  const restartHandler = () => {
    setGameTurns([]);
  };

  /**
   * PLAYER NAME HANDLE FUNCTION
   */
  const playerNameChangeHandler = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={playerNameChangeHandler}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={playerNameChangeHandler}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restartHandler} />
        )}
        <GameBoard onSelectSquare={selectSquareHandler} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
