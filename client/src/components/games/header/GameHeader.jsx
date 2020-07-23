import React, { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";
import PlayerIcon from "../PlayerIcon";

export default function GameHeader (props) {
  const [players, setPlayers] = useState([{_id: null}]);
  const [gameName, setGameName] = useState("...Loading");

  useEffect(() => {
    setPlayers(props.players)
    setGameName(props.gameName)
  }, [props.players, props.gameName]);

  const renderPlayerIcons = () => (
    <div id="game_show-players">
      {players.map(player =>
        <PlayerIcon key={player._id} player={player} />
      )}
    </div>
  )
  
  return (
    <div id="game_show-header">
      <h1>{gameName}</h1>
      {renderPlayerIcons()}
    </div>
  )

}