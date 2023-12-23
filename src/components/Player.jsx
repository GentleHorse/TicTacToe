import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const editNameHandler = () => {
    setIsEditing((isEditing) => !isEditing);

    // When the status changes from "Edit" to "Save"
    // Fetch old state (isEditing = true)
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const changeHandler = (event) => {
    setPlayerName(event.target.value);
  };

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={changeHandler} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editNameHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
