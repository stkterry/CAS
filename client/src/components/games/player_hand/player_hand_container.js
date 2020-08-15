import { connect } from "react-redux";
import PlayerHand from "./PlayerHand";

import { updateCardsInPlay } from "../../../actions/game_actions";

const mSP = state => ({
  cards: state.games.playerState.white,
  gameId: state.games.active._id
});

const mDP = dispatch => ({
  updateCardsInPlay: (gameId, card) => dispatch(updateCardsInPlay(gameId, card))
})

export default connect(mSP, mDP)(PlayerHand);