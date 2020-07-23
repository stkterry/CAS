import axios from "axios";

//Axios ======================================================================

export const APICalls = {
  getNRandColorCards: (n, color) => axios.get(`/api/cards/rand/${n}/${color}`)
}

// Dispatch Labels
export const RECEIVE_CARDS = "RECEIVE_CARDS";

// Dispatches
export const receiveCards = cards => ({
  type: RECEIVE_CARDS,
  cards: cards
});

// Dispatch Functions

export const getNRandColorCards = (n, color) => dispatch => APICalls.getNRandColorCards(n, color)
  .then(cards => dispatch(receiveCards(cards)))
  .catch(err => console.log(err));