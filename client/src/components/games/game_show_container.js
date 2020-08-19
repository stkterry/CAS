import { connect } from "react-redux";
import { getActiveGame, getPlayerState } from "../../actions/game_actions";
import { connectSocket, disconnectSocket, watchCardsInPlay } from "../../actions/socket_actions";
import GameShow from "./GameShow";

const mSP = state => ({
  user: state.session.user,
  game: state.games.active,
  playerStates: state.games.active.playerStates,
  players: [],
  host: null,
  gameName: "",
});


const mDP = dispatch => ({
  getActiveGame: (game_id, user_id) => dispatch(getActiveGame(game_id, user_id)),
  getPlayerState: (game_id, user_id) => dispatch(getPlayerState(game_id, user_id)),
  connectSocket : (opts=null) => dispatch(connectSocket(opts)),
  disconnectSocket: () => dispatch(disconnectSocket()),
  watchCardsInPlay: () => dispatch(watchCardsInPlay(dispatch))
})

export default connect(mSP, mDP)(GameShow);