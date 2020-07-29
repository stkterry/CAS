import { connect } from "react-redux";

import { postMessage } from "../../actions/message_actions";
import MessageForm from "./MessageForm";

const mSP = state => ({
  gameId: state.games.active._id,
  userId: state.session.user.id
})


const mDP = dispatch => ({
  postMessage: messageDat => dispatch(postMessage(messageDat))
})


export default connect(mSP, mDP)(MessageForm);