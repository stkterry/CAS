import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { CSSTransitions } from "react-transition-group";

import CardLook from "../card_anims/CardLook";
import PlayerHandContainer from "./player_hand/player_hand_container";
// import FeatureSelectionModal from "../switch_modals/FeatureSelectionModal";
import MessageBoxContainer from "../messages/message_box_container";

import GameHeader from "./header/GameHeader";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cardsInPlay: { white: [], black: [] },
      playerStates: {},
      features: {
        showHand: true,
        showMessages: false,
        showWon: false
      }
    }
  }


  componentDidMount() {
    this.props.getActiveGame(this.props.match.params.game_id);
    this.props.getPlayerState(this.props.match.params.game_id, this.props.user.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps.game !== this.props.game) {
      // Reconfigure playerStates
      let playerStates = {};
      for (let playerState of this.props.game.playerStates) {
        playerStates[playerState._id] = playerState;
      }
      // Merge player data into playerStates!!!
      for (let player of this.props.game.players) {
        playerStates[player._id] = Object.assign(playerStates[player._id], player);
      }

      this.setState({
        game: this.props.game,
        currentTurn: this.props.game.currentTurn,
        white: this.props.game.white,
        black: this.props.game.black,
        cardsInPlay: this.props.game.cardsInPlay,
        gameName: this.props.game.name,
        players: this.props.game.players,
        playerStates: playerStates,
      })
    }

    if (prevProps.playerState !== this.props.playerState) {
      this.setState({ playerState: this.props.playerState });
    }

  }

  renderWhiteCardsInPlay = () => {
    const cards = this.state.cardsInPlay.white;
    return cards.map(card => 
      <li key={card._id}>
        <CardLook className={"game_show-played_card game_show-card"} card={card} />
      </li>
    )
  }

  renderBlackCardInPlay = () => {
    const card = this.state.cardsInPlay.black;
    return (
      <CardLook className="game_show-player_cards game_show-card" key={card._id} card={card} />
    )
  }

  renderPlayerTurn = () => {
    if (!this.state.currentTurn) return;
    else {
      const handle = this.state.playerStates[this.state.currentTurn].handle;
      return handle + "'s turn"
    }
  }

  setActiveFeature = feature => this.setState({
    features: {
      showHand: feature === "showHand",
      showMessages: feature === "showMessages",
      showWon: feature === "showWon"
    }
  })


  render() {

    return (
      <div id="game_show">
        <GameHeader 
          playerStates={this.state.playerStates} 
          gameName={this.state.gameName}
          currentTurn={this.state.currentTurn}
        />
        <div id="game_show-content">
          <div id="game_show-left">
            <div id ="game_show-black">
              {this.renderBlackCardInPlay()}
              <h5 className="game_show-current_turn">{this.renderPlayerTurn()}</h5>
            </div>
          </div>
          <ul id="game_show-right">
              {this.renderWhiteCardsInPlay()}
          </ul>
        </div>
          <div id="game_show-features">
            {this.state.features.showHand && <PlayerHandContainer />}
            <MessageBoxContainer show={this.state.features.showMessages}/>
          </div>

          <div id="fs_modal-container">
            <div id="fs_modal">
            <button onClick={_ => this.setActiveFeature("showMessages")}>Messages</button>
            <button onClick={_ => this.setActiveFeature("showHand")}>Hand</button>
              <button>Game History</button>
              <button>Black Cards</button>
            </div>
          </div>
      </div>
    )
  }

}

export default withRouter(GameShow);