import React from "react";

class GameBox extends React.Component {

  render() {
    const { name, players, host, rules } = this.props.game;
    return (
      <div className="game_box">
        <h1>{name}</h1>
        <div className="game_box-entry">
          <h2>Players ({players.length}/8)</h2>
          <h3>{players.map(player => player.handle).join(', ')}</h3>
        </div>

        <div className="game_box-entry">
          <h2>Rules: </h2>
          <h3></h3>
        </div>

      </div>
    )
  }
}

export default GameBox;