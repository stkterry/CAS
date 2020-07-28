import { connect } from "react-redux";
import { getGameMessages } from "../../actions/message_actions";
import MessageIndex from "./MessageIndex";

const mSP = state => ({
  messages: state.messages.active,
  gameId: state.games.active._id,
  new: state.messages.new
});


const mDP = dispatch => ({
  getGameMessages: gameId => dispatch(getGameMessages(gameId))
})

export default connect(mSP, mDP)(MessageIndex);