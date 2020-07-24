import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { CSSTransitions } from "react-transition-group";

import CardLook from "../card_anims/CardLook";
import FeatureSelectionModal from "../switch_modals/FeatureSelectionModal";

import GameHeader from "./header/GameHeader";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: {},
      white: {},
      black: {},
      players: [],
      gameName: "...Loading",
      gameState: null
    }
  }

  isLoaded = () => Object.entries(this.state.game).length > 0;

  componentDidMount() {
    this.props.getGame(this.props.match.params.game_id);
    console.log(this.props.game)
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

    if (prevProps.players !== this.props.players) {
      this.setState({ players: this.props.players })
    }

    if (prevProps.gameName !== this.props.gameName) {
      this.setState({ gameName: this.props.gameName })
      console.log(this.state.gameName)
    }

    if (prevProps.gameState !== this.props.gameState) {
      console.log('here')
      this.setState({ gameState: this.props.gameState })
    }

  }

  renderCardsTemp = () => {
    if (this.isLoaded()) {
      let cards = [];
      for (let i = 0; i < 8; i++) {
        cards.push(this.state.game.white[Math.floor(Math.random() * this.state.game.white.length)]);
      }
      return (
        cards.map(card => (
          <CardLook className={"game_show-played_card game_show-card"} key={card._id} card={card} />
        ))
      )
    }
  }

  renderBlackCardTemp = () => {
    if (this.isLoaded()) {
      const card = this.state.game.black[Math.floor(Math.random() * this.state.game.black.length)];

      return(
        <CardLook className="game_show-player_cards game_show-card" key={card._id} card={card} />
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
          <CardLook className={"game_show-player_cards game_show-card"} key={card._id} card={card} />
        ))
      )
      
    }
  }

  render() {
    return (
      <div id="game_show">
        <GameHeader players={this.state.players} gameName={this.state.gameName}/>
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
        <FeatureSelectionModal />
      </div>
    )
  }

}

export default withRouter(GameShow);