import { connect } from "react-redux";
import { getActiveGame, getPlayerState } from "../../actions/game_actions";
import GameShow from "./GameShow";

const mSP = state => ({
  user: state.session.user,
  game: state.games.active,
  playerStates: state.games.active.playerStates,
  playerState: state.games.playerState,
  players: [],
  host: null,
  gameName: "",
});


const mDP = dispatch => ({
  getActiveGame: (game_id, user_id) => dispatch(getActiveGame(game_id, user_id)),
  getPlayerState: (game_id, user_id) => dispatch(getPlayerState(game_id, user_id))
})

export default connect(mSP, mDP)(GameShow);