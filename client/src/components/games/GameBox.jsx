import React from "react";
import { Link, withRouter } from "react-router-dom";

class GameBox extends React.Component {

  toGamePage = () => {
    const game_id = this.props.game._id;
    this.props.history.push({
      pathname: `/game/${game_id}`
    });
  }

  render() {
    const { name, players, host, rules, cardPacks } = this.props.game;

    const playerNames = players.map(player => player.handle).join(', ');
    const packNames = cardPacks.map(pack => pack.name).join(', ');

    return (
      <div className="game_box rise">
        <h4>{name}</h4>
        <div className="game_box-entry">
          <h6 className="game_box-entry-title">
            Players ({players.length}/8)
          </h6>
          <p title={playerNames} className="game_box-entry-content">
            {playerNames}
          </p>
        </div>

        <div className="game_box-entry">
          <h6 className="game_box-entry-title">
            Rules
          </h6>
          <p title='Some Long TEXT' className="game_box-entry-content">
            Here's a rule, here's another, and another, oh look
            another rule, here's another rule too
          </p>
        </div>

        <div className="game_box-entry">
          <h6 className="game_box-entry-title">
            Card Packs ({cardPacks.length}/68)
          </h6>
          <p title={packNames} className="game_box-entry-content">
            {packNames}
          </p>
        </div>

        <div className="game_box-buttons">
          <button onClick={this.toGamePage} className="btn-exp">
            <span>Join</span>
          </button>
          <button className="btn-exp">
            <span>Spectate</span>
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(GameBox);