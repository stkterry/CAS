import React from "react";
import { Link, withRouter } from "react-router-dom";

const DEF_ICON = require("../../assets/images/user2.png");


export default function PlayerIcons (props) {
  
  const genIcon = () => 
    (props.player.img) ? this.img() : this.ico();

  const ico = () => 
    <img src={DEF_ICON} className="player_icon-ico" />;

  const img = () => {};

  return (
    <div className="player_icon">
        {ico()}
        <h6>{props.player.handle}</h6>
    </div>
  )

}