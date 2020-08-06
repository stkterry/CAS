
import {
  RECEIVE_CARDS
} from "../actions/card_actions";

const initialState = [];

const CardsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CARDS:
      return action.cards.data
    default:
      return state;
  }
}

export default CardsReducer;