import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { CSSTransitions } from "react-transition-group";

import CardLook from "../card_anims/CardLook";
import FeatureSelectionModal from "../switch_modals/FeatureSelectionModal";
import MessageBoxContainer from "../messages/message_box_container";

import GameHeader from "./header/GameHeader";

class GameShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: {},
      white: [],
      black: [],
      players: [],
      gameName: "...Loading",
      cardsInPlay: { white: [], black: [] },
      rounds: null,
      playerStates: {},
      playerState: { white: [], black: [], score: null }
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
      <CardLook className={"game_show-played_card game_show-card"} key={card._id} card={card} />
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

  renderPlayerCards = () => {
    const cards = this.state.playerState.white;
    return (
      cards.map(card => (
        <CardLook className={"game_show-player_cards game_show-card"} key={card._id} card={card} />
      ))
    )
  }

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
            {/* <div id="game_show-current"></div> */}
            <div id ="game_show-black">
              {this.renderBlackCardInPlay()}
              <h5 className="game_show-current_turn">{this.renderPlayerTurn()}</h5>
            </div>
          </div>
          <div id="game_show-right">
            {this.renderWhiteCardsInPlay()}
          </div>
        </div>
          <div id="game_show-player_cards">
              {this.renderPlayerCards()}
          </div>
          <div id="game_show-bottom_buffer">
            <MessageBoxContainer game_id={this.state.game._id}/>
          </div>
          <FeatureSelectionModal />
      </div>
    )
  }

}

export default withRouter(GameShow);