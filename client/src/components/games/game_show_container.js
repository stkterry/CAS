import { connect } from "react-redux";
import { getActiveGame } from "../../actions/game_actions";
import GameShow from "./GameShow";

const mSP = state => ({
  game: state.games.active,
  players: state.games.active.players,
  host: state.games.active.host,
  gameName: state.games.active.name
});


const mDP = dispatch => ({
  getGame: game_id => dispatch(getActiveGame(game_id))
})

export default connect(mSP, mDP)(GameShow);