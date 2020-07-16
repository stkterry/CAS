const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const { eRes } = require("../../validation/validation-util");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const keys = require("../../config/keys");
const User = require("../../models/User");
const { create } = require("../../models/User");

//User default errors
const ERRORS = {
  emailUnavailable: { email: "A user has already registered with that email" },
  handleUnavailable: { handle: "A user has already registered with that handle" },
  userNotFound: { email: "This user does not exist" },
  incorrectPassword: { password: "Incorrect password" }
};

// User maker
const createUser = (req, res) => {
  const newUser = new User({
    handle: req.body.handle,
    email: req.body.email,
    password: req.body.password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => genToken(user, res))
        .catch(err => console.log(err));
    })
  })
}

// Generate a jwt web token for tracking user login
const genToken = (user, res) => {
  jwt.sign(
    {id: user.id, handle: user.handle, email: user.email },
    keys.secretOrKey,
    { expiresIn: 3600 },
    (err, token) => res.json({ success: true, token: "Bearer " + token })
  )
}

// TEST
router.get("/test", (req, res) => res.json({ msg: "The users route!!!"}));

// POST ----------------------------------------------------------------------

// register
router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) eRes(res, 400, errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) eRes(res, 400, ERRORS.emailUnavailable)
      else createUser(req, res);
    })
})

// login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne ({ email })
    .then(user => {
      
      if (!user) eRes(res, 404, { email: "This user does not exist!" });

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) genToken(user, res)
          else eRes(res, 400, { password: 'Incorrect password' });
        })
    })

})

// GET -----------------------------------------------------------------------
// current
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

module.exports = router;