import React, { useState, useEffect } from "react";

import CardLook from "../../card_anims/CardLook";

export default function PlayerHand(props) {

  const [canPlayCard, setCanPlayCard] = useState(true);
  const [hand, setHand] = useState(props.cards);
  const [black, setBlack] = useState(props.cardsInPlay.black);
  const [pickCount, setPickCount] = useState(1);
  const [drawCound, setDrawCount] = useState(1);
  const [selected, setSelected] = useState([]);

  const defClassName = "game_show-player_cards game_show-card";
  const highlight = "player_hand-highlight_card";

  useEffect(() => {
    const { draw, pick } = props.cardsInPlay.black || 1;
    setPickCount(pick);
    setDrawCount(draw);
  }, [props.cardsInPlay.black])

  useEffect(() => {
    // Map a className attribute to each card in the hand to keep track of which are highlighted?
    const hand = {};
    for (let i = 0; i < props.cards.length; i++) {
      let card = props.cards[i];
      card.className = defClassName;
      hand[card._id] = card; 
    }
    setHand(hand);
  }, [props.cards]);

  const onClick = card => {
    console.log(selected);
    if (selected.includes(card._id)) {
      setSelected(selected.filter(cardId => cardId !== card._id));
      setHand(prevHand => ({
        ...prevHand,
        [card._id]: { ...prevHand[card._id], className: defClassName }
      }))
    } else if (selected.length < pickCount) {
      setHand(prevHand => ({
        ...prevHand,
        [card._id]: { ...prevHand[card._id], className: `${defClassName} ${highlight}` }
      }))
      setSelected(prevSelected => [...prevSelected, card._id]);
    }
  }

  const canPlay = () => {
    if (canPlayCard) {
      setCanPlayCard(false);
      if (props.currentTurn === props.userId) return false;
      if (props.cardsInPlay.white.filter(({playerId}) => playerId === props.userId).length) return false;
    } else return false;
    return true;
  }

  const onDoubleClick = card => {
    if (!canPlay()) return;
    props.addToCardsInPlay(card);
    setHand(prevHand => {
      const newHand = Object.assign({}, prevHand);
      delete newHand[card._id];
      return newHand;
    });
    props.receiveCardInPlay({card: card, playerId: props.userId});
  }

  return (
    <div id="game_show-player_cards">
      {Object.values(hand).map(card =>
        <CardLook 
          onClick={() => onClick(card)}
          onDoubleClick={() => onDoubleClick(card)}
          key={card._id}
          {...card}
        />
      )}
    </div>
  )
}