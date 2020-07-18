import React from 'react';
import { Link, withRouter } from "react-router-dom";

import PlayerIcon from "./PlayerIcon";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: {}
    }
  }

  componentWillMount() {
    this.props.getGame(this.props.match.params.game_id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps.game !== this.props.game) {
      this.setState({ game: this.props.game });
    }
  }

  renderPlayersIcons = () => {
    return (this.props.game.players) ? (
      <div id="game_show-players">
        {this.props.game.players.map(player =>
          <PlayerIcon key={player._id} player={player} />)}
      </div>
    ) : (
      <h1>Not Yet</h1>
    );
  }

  renderCardsTemp = () => {
    const text = "Here's some card text to read you loser!"

    let arr = [];
    for (let i = 0; i < 8; i++) arr.push(text);

    return (
      arr.map(text => 
        <div className="card_standin">
            <h5>{text}</h5>

        </div>
      )
    )
  }

  render() {
    return (
      <div id="game_show">
        <h1>{this.state.game.name}</h1>
          {this.renderPlayersIcons()}
        <div id="game_show-content">
          <div id="game_show-left">
            <h1>Content</h1>
          </div>
          <div id="game_show-played_cards">
            {this.renderCardsTemp()}
          </div>
        </div>
        {/* <div id="game_show-player_cards">

        </div> */}
      </div>
    )
  }

}

export default withRouter(GameShow);