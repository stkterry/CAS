import React, { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";
import PlayerIcon from "../PlayerIcon";

export default function GameHeader (props) {
  const [players, setPlayers] = useState([{_id: null}]);
  const [gameName, setGameName] = useState("...Loading");
  const [gameState, setGameState] = useState(null);
  const [animNow, setAnimNow] = useState(true);

  useEffect(() => {
    setPlayers(props.players)
    setGameName(props.gameName)
  }, [props.players, props.gameName]);

  useEffect(() => {
    setGameState(props.gameState)
  }, [props.gameState]);

  useEffect(() => {
    setTimeout(() => setAnimNow(false), 5000)
  }, [props.gameName])
  
  const animTitle = () => setAnimNow(!animNow);

  const renderPlayerIcons = () => (
    <div id="game_show-players">
      {players.map(player =>
        <PlayerIcon key={player._id} player={player} />
      )}
    </div>
  )
  
  return (
    <div id="game_show-header" onMouseEnter={animTitle} onMouseLeave={animTitle}>
      <CSSTransition
        classNames="game_show-header-title"
        in={animNow}
        timeout={300}
        unmountOnExit
        appear
      >
        <h1>{gameName}</h1>
      </CSSTransition>
      {renderPlayerIcons()}
    </div>
  )

}