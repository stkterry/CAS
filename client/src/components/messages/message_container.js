import { connect } from "react-redux";
import Message from "./Message";

const mSP = state => ({
  userId: state.session.user.id
});

const mDP = dispatch => ({});

export default connect(mSP, mDP)(Message);