import React, { useState, useEffect } from "react";

import { CSSTransition} from "react-transition-group";
import PlayerIcon from "./PlayerIcon";

export default function GameHeader (props) {
  const [playerStates, setPlayerStates] = useState({});
  const [gameName, setGameName] = useState("...Loading");
  const [animNow, setAnimNow] = useState(true);
  const [currentTurn, setCurrentTurn] = useState(props.currentTurn)
  const [showHandle, setShowHandle] = useState(true);

  useEffect(() => {
    setCurrentTurn(props.currentTurn)
    setPlayerStates(props.playerStates)
    setGameName(props.gameName)
    setTimeout(() => setAnimNow(false), 5000)
  }, [props.playerStates, props.gameName, props.currentTurn]);

  const renderPlayerIcons = () => (
    <div component="div" id="game_show-header-players">
      {Object.values(playerStates).map(playerState => 
        <PlayerIcon key={playerState._id} playerState={playerState} czar={playerState._id === currentTurn} showHandle={showHandle}/>
      )}
    </div>
  )

  const showHandles = () => setShowHandle(true);
  const hideHandles = () => setShowHandle(false);
  const animTitle = () => setAnimNow(!animNow);
  
  return (
    <div id="game_show-header" onMouseEnter={animTitle} onMouseLeave={animTitle}>
      <CSSTransition
        classNames="game_show-header-transitions-title"
        in={animNow}
        timeout={300}
        unmountOnExit
        appear
        onEnter={showHandles}
        onExit={hideHandles}
      >
        <h1>{gameName}</h1>
      </CSSTransition>
      {renderPlayerIcons()}
    </div>
  )

}