import React, { useState, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import PlayerIcon from "./PlayerIcon";

export default function GameHeader (props) {
  const [playerStates, setPlayerStates] = useState({_id: { 'is': 'empty' }});
  const [gameName, setGameName] = useState("...Loading");
  const [animNow, setAnimNow] = useState(true);
  const [currentTurn, setCurrentTurn] = useState(props.currentTurn)

  useEffect(() => {
    setCurrentTurn(props.currentTurn)
    setPlayerStates(props.playerStates)
    setGameName(props.gameName)
    setTimeout(() => setAnimNow(false), 5000)
  }, [props.playerStates, props.gameName]);

  // useEffect(() => {
  //   setGameState(props.gameState)
  // }, [props.gameState]);


  // useEffect(() => {
  // }, [props.gameName])

  
  const animTitle = () => setAnimNow(!animNow);
  
  const renderPlayerIcons = () => {
    return (
      <div id="game_show-header-players">
        {Object.values(playerStates).map(playerState =>
          <PlayerIcon 
            key={playerState._id} 
            playerState={playerState} 
            czar={currentTurn === playerState._id}
          />
        )}
      </div>
    )
  }
  
  return (
    <div id="game_show-header" onMouseEnter={animTitle} onMouseLeave={animTitle}>
      <div id="game_show-settings">
        
      </div>
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