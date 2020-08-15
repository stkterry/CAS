import React from "react";

import CardLook from "../../card_anims/CardLook";

export default function PlayerHand(props) {

  const onClick = () => console.log("I'm a click")
  const onDoubleClick = () => console.log("I'm a double click")

  const onDC = (card) => {
    // take selected card out of player hand and assign it to cards in play...
    // afterwards update the database...
    // then notify users via sockets ...

    props.updateCardsInPlay(card);
  }

  return (
    <div id="game_show-player_cards">
      {props.cards.map(card =>
        <CardLook 
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          key={card._id}
          className={"game_show-player_cards game_show-card"}
          card={card}
        />
      )}
    </div>
  )
}