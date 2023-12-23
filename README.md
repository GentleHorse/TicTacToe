## GOOD EXAMPLE OF ONE STATE MANAGEMENT
All state is managed with one state, "gameTurns" in App.jsx. Each child component extracts as much as data as possible to make itself functional.

#### Player.jsx
Using "activePlayer" data derived from the "gameTurns" state for CSS styling purpose.

#### GameBoard.jsx
Using "gameBoard" data derived from the "gameTurns" state for updating game board infomation array.

#### Log.jsx
Using the "gameTurns" state for printing out player actions.

## BUTTON CAN BE CLICKED ONLY ONCE
Enable default button tag property "disable" in GameBoard.jsx once one of the players click a button.  

## WINNING COMBINATIONS
All winning combinations data is stored in winning-combinations.js and whether winner condition is satisfied or not is checked inside App.jsx.

## RESTART GAME
Restart game function is defined inside App.jsx and used in GameOver.jsx.

## PLAYER NAME
Name change handle function is definded inside App.jsx and used in Player.jsx.




