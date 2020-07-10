const Strat = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model("User");
const keys = require("./keys");

const options = {
  jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
}

module.exports = passport => {
  passport.use(new Strat(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => user ? done(null, user) : done(null, false))
      .catch(err => console.log(err));
  }))
}