import React from 'react';
import { Link, withRouter } from "react-router-dom";

import PlayerIcon from "./PlayerIcon";
import CardLook from "../card_anims/CardLook";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: {}
    }
  }

  componentDidMount() {
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
    if (this.state.game.cardPacks) {
      let cards = [];
      let pack;
      let packs = this.state.game.cardPacks;
      for (let i = 0; i < 8; i++) {
        pack = packs[Math.floor(Math.random() * packs.length)];
        cards.push(pack.white[Math.floor(Math.random() * pack.white.length)]);
      }
      return (
        cards.map(card => (
          <CardLook key={card._id} card={card} />
        ))
      )
    }
  }

  renderBlackCardTemp = () => {
    if (this.state.game.cardPacks) {
      const packs = this.state.game.cardPacks;
      const pack = packs[Math.floor(Math.random() * packs.length)];
      const card = pack.black[Math.floor(Math.random() * pack.black.length)];

      return(
        <CardLook key={card._id} card={card} />
      )
    }
  }

  renderPlayerTurnTemp = () => {
    if (this.state.game.cardPacks) {
      const player = this.state.game.players[Math.floor(Math.random() * this.state.game.players.length)];
      return player.handle + "'s turn"
    }

  }

  renderPlayerCardsTemp = () => {
    if (this.state.game.cardPacks) {

      
    }
  }

  render() {

    return (
      <div id="game_show">
        <h1>{this.state.game.name}</h1>
          {this.renderPlayersIcons()}
        <div id="game_show-content">
          <div id="game_show-left">
            <div id="game_show-current">

            </div>
            <div id ="game_show-black">
              {this.renderBlackCardTemp()}
              <h5 className="game_show-current_turn">{this.renderPlayerTurnTemp()}</h5>
            </div>
          </div>
          <div id="game_show-played_cards">
            {this.renderCardsTemp()}
          </div>
        </div>
        <div id="game_show-player_cards">

        </div>
      </div>
    )
  }

}

export default withRouter(GameShow);