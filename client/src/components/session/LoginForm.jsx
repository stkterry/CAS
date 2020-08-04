import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";

import InputEntry from "./InputEntry";
import ErrorList from "../errors/ErrorList";
import CardFlip from "../card_anims/CardFlip";

const defaultValues = {
  email: "",
  password: ""
}

export default withRouter(function LoginForm (props) {

  const [errors, setErrors] = useState({});
  const [cards, setCards] = useState(props.cards);
  const getNRandColorCards = props.getNRandColorCards;
  
  useEffect(() => { setErrors(props.errors) }, [props.errors])
  useEffect(() => { setCards(props.cards) }, [props.cards])
  useEffect(() => { if (!cards.length) getNRandColorCards(41, 'black') },
    [cards.length, getNRandColorCards])

  const onSubmit = formData => props.login(formData);
  const { register, handleSubmit } = useForm({ defaultValues })

  return (
    <div id="signup_form-container">
      <div id="signup_form">
        <div id="signup_form-heading">
          <h3 className="signup_form-title_text">Crimes Against Stupidity</h3>
          <h4>&#8627; Sign in to your account</h4>
        </div>
        <div id="signup_form-body">
          <div id="signup_form-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <br />
              <InputEntry 
                name="email"
                type="text"
                className="inputEntry"
                refLink={register}
                placeholder="Email"
              />
              <InputEntry
                name="password"
                type="password"
                className="inputEntry"
                refLink={register}
                placeholder="Password"
              />
              <br />
              <div id="signup_form-buttons">
                <button className="btn-ghost" onClick={handleSubmit}>Login</button>
              </div>
            </form>

            <div id="signup_form-errors">
              <ErrorList errors={errors} />
            </div>
          </div>
          <div id="signup_form-right">
            <div id="signup_form-card_flip">
              <CardFlip content={cards.map(card => card.content)} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
})