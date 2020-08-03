import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSTransition, TransitionGroup } from "react-transition-group";

const DEF_ICON = require("../../../assets/images/user2.png");

const TEMP_RULES = {
  roundsTotal: 8,

}

export default function PlayerIcons(props) {

  // const genIcon = () =>
  //   (props.playerState.img) ? this.img() : this.ico();
  // const img = () => { };

  const ico = () =>
    <img src={DEF_ICON} className="player_icon-ico" />;

  const checkCzar = (_id) => {
    if (_id === props.czar) {
      return <FontAwesomeIcon icon="crown" className="player_icon-czar" />
    }
  }

  const renderPlayerIcon = (playerState) => (
    <div key={playerState._id} className="player_icon">
      <div className="player_icon-score-container">
        <h5 className="player_icon-score">{playerState.score}</h5>
      </div>
      {checkCzar(playerState._id)}
      {ico()}
      <CSSTransition
        in={props.showHandle}
        timeout={300}
        classNames="game_show-header-transitions-handles"
        unmountOnExit
        appear
      >
        <h6>{playerState.handle}</h6>
      </CSSTransition>
    </div>
  )

  return (
    <TransitionGroup component={null}>
      {Object.values(props.playerStates)
        .map(playerState => renderPlayerIcon(playerState))}
    </TransitionGroup>
  )
}