import { connect } from "react-redux";
import PlayerHand from "./PlayerHand";

import { addToCardsInPlay } from "../../../actions/socket_actions";
import { receiveCardInPlay } from "../../../actions/game_actions";

const mSP = state => ({
  cards: state.games.playerState.white,
  currentTurn: state.games.active.currentTurn,
  cardsInPlay: state.games.active.cardsInPlay,
  userId: state.session.user.id
});

const mDP = dispatch => ({
  addToCardsInPlay: card => dispatch(addToCardsInPlay(card)),
  receiveCardInPlay: cardDat => dispatch(receiveCardInPlay(cardDat))
})

export default connect(mSP, mDP)(PlayerHand);