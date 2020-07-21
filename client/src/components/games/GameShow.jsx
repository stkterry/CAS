import React from 'react';
import { Link, withRouter } from "react-router-dom";

import PlayerIcon from "./PlayerIcon";
import CardLook from "../card_anims/CardLook";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: {},
      white: {},
      black: {}
    }
  }

  isLoaded = () => Object.entries(this.state.game).length > 0;

  componentDidMount() {
    this.props.getGame(this.props.match.params.game_id);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps.game !== this.props.game) {
      this.setState({ 
        game: this.props.game
      });
    }

  }

  renderPlayersIcons = () => {
    return (this.isLoaded()) ? (
      <div id="game_show-players">
        {this.state.game.players.map(player =>
          <PlayerIcon key={player._id} player={player} />)}
      </div>
    ) : (
      <h1>Not Yet</h1>
    );
  }

  renderCardsTemp = () => {
    if (this.isLoaded()) {
      console.log(this.state.white)
      let cards = [];
      for (let i = 0; i < 8; i++) {
        cards.push(this.state.game.white[Math.floor(Math.random() * this.state.game.white.length)]);
      }
      return (
        cards.map(card => (
          <CardLook classes={"game_show-played_card"} key={card._id} card={card} />
        ))
      )
    }
  }

  renderBlackCardTemp = () => {
    if (this.isLoaded()) {
      const card = this.state.game.black[Math.floor(Math.random() * this.state.game.black.length)];

      return(
        <CardLook className="game_show-player_cards" key={card._id} card={card} />
      )
    }
  }

  renderPlayerTurnTemp = () => {
    if (this.state.game.players) {
      const player = this.state.game.players[Math.floor(Math.random() * this.state.game.players.length)];
      return player.handle + "'s turn"
    }

  }

  renderPlayerCardsTemp = () => {
    if (this.isLoaded()) {
      const cards = new Array(10);
      for (let i = 0; i < 10; i++) {
        cards[i] = this.state.game.white[Math.floor(Math.random() * this.state.game.white.length)];
      }

      return (
        cards.map(card => (
          <CardLook classes={"game_show-player_cards"} key={card._id} card={card} />
        ))
      )
      
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
            {this.renderPlayerCardsTemp()}
        </div>
      </div>
    )
  }

}

export default withRouter(GameShow);