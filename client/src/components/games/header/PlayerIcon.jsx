import React from "react";
import { FontAwesomeIcon as Fai } from '@fortawesome/react-fontawesome'

const DEF_ICON = require("../../../assets/images/user2.png");

export default function PlayerIcons (props) {
  
  // const genIcon = () => 
  //   (props.playerState.img) ? this.img() : this.ico();

  const ico = () => 
    <img alt="PlayerIcon" src={DEF_ICON} className="player_icon-ico" />;

  // const img = () => {};

  const checkCzar = () => {
    if (props.czar) return <Fai icon="crown" className="player_icon-czar" />
  }

  return (
    <div className="player_icon">
      <div className="player_icon-score-container">
        <h5 className="player_icon-score">{props.playerState.score}</h5>
      </div>
      {checkCzar()}
      {ico()}
      <h6>{props.playerState.handle}</h6>
    </div>
  )

}