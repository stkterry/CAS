import React from "react";
import { Link, withRouter } from "react-router-dom";

const DEF_ICON = require("../../assets/images/user2.png");

class PlayerIcon extends React.Component {

  genIcon = () => 
    (this.props.player.img) ? this.img() : this.ico();

  ico = () =>
    <img src={DEF_ICON} className="player_icon-ico" />;

  img() {

  }

  render() {

    const { handle } = this.props.player;

    return (
      <div className="player_icon">
        {this.ico()}
        <h6>{handle}</h6>
      </div>
    )
  }
}

export default PlayerIcon;