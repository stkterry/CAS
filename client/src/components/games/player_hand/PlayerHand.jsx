import React, { useState, useEffect } from "react";

import CardLook from "../../card_anims/CardLook";

export default function PlayerHand(props) {

  const [canPlayCard, setCanPlayCard] = useState(true);
  const [cards, setCards] = useState(props.cards);
  useEffect(() => {
    setCards(props.cards);
  }, [props.cards])

  const canPlay = () => {
    if (canPlayCard) {
      setCanPlayCard(false);
      if (props.currentTurn === props.userId) return false;
      if (props.cardsInPlay.white.filter(({playerId}) => playerId === props.userId).length) return false;
    } else return false;
    return true;
  }

  const onDC = card => {
    if (!canPlay()) return;
    props.addToCardsInPlay(card);
    setCards(prev => prev.filter(cardItem => card !== cardItem));
    props.receiveCardInPlay({card: card, playerId: props.userId});
  }

  return (
    <div id="game_show-player_cards">
      {cards.map(card =>
        <CardLook 
          // onClick={onClick}
          onDoubleClick={() => onDC(card)}
          key={card._id}
          className={"game_show-player_cards game_show-card"}
          {...card}
        />
      )}
    </div>
  )
}