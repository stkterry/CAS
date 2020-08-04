import React, {useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import CardFlip from "../card_anims/CardFlip";
import ErrorList from "../errors/ErrorList";
import InputEntry from "./InputEntry";
import * as ValidAPI from "../../util/soft_validation";

const defaultValues = {
  email: "",
  handle: "",
  password: "",
  password2: ""
}

export default withRouter(function SignupForm (props) {

  const [errors, setErrors] = useState({});
  const [cards, setCards] = useState(props.cards);
  const getNRandColorCards = props.getNRandColorCards;
  const checkForUserByHandle = props.checkForUserByHandle;

  useEffect(() => { setErrors(props.errors) }, [props.errors]);
  useEffect(() => { setCards(props.cards) }, [props.cards]);
  useEffect(() => { if (props.signedIn) props.login(getValues()) });

  useEffect(() => { if (!cards.length) getNRandColorCards(41, 'black') }, 
    [cards.length, getNRandColorCards]);

  const onSubmit = formData => props.signup(formData);
  const { register, getValues, handleSubmit } = useForm({ defaultValues });

  const validate = field => {
    if (field === "handle") {
      const value = getValues('handle');
      checkForUserByHandle(value);
    }
    setErrors(ValidAPI[field]({...getValues(), available: props.handleAvailable }));
  }

  return (
    <div id="signup_form-container">
      <div id="signup_form">
        <div id="signup_form-heading">
          <h3 className="signup_form-title_text">Crimes Against Stupidity</h3>
          <h4>&#8627; Create your account</h4>
        </div>
        <div id="signup_form-body">
          <div id="signup_form-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <br />
              <InputEntry
                name="handle"
                type="text"
                className="inputEntry"
                refLink={register}
                onChange={() => validate('handle')}
                placeholder="Handle"
              />
              <InputEntry
                name="email"
                type="text"
                className="inputEntry"
                refLink={register}
                onChange={() => validate('email')}
                placeholder="Email"
              />
              <InputEntry
                name="password"
                type="password"
                className="inputEntry"
                refLink={register}
                onChange={() => validate('password')}
                placeholder="Password"
              />
              <InputEntry
                name="password2"
                onChange={() => validate('password2')}
                className="inputEntry"
                refLink={register}
                type="password"
                placeholder="Confirm Password"
              />
              <br />
              <button className="btn-ghost" onClick={handleSubmit}>Create Account</button>
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
});
