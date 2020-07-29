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

//User default errors
const ERRORS = {
  emailUnavailable: { "A user has already registered with that email": null },
  handleUnavailable: { "A user has already registered with that handle": null },
  userNotFound: { "This user does not exist": null },
  incorrectPassword: { "Incorrect password": null }
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
    // { expiresIn: 3600 }, // Disable expiry
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

  User.findOne({ email: req.body.email, handle: req.body.handle })
    .then(user => {
      if (user) {
        if (user.email === req.body.email) eRes(res, 400, ERRORS.emailUnavailable)
        else if (user.handle === req.body.handle) eRes(res, 400, ERRORS.handleUnavailable);
      }
      else createUser(req, res);
    })
})

// login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne ({ email })
    .then(user => {
      
      if (!user) eRes(res, 404, ERRORS.userNotFound);

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) genToken(user, res)
          else eRes(res, 400, ERRORS.incorrectPassword);
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

// /checkhandle/:handle (Check if the handle is in use)
router.get('/checkhandle/:handle', (req, res) => {
  User.findOne({handle: req.params.handle})
    .then(user => (
      (user && user.handle === req.params.handle) ? 
        res.json({ exists: true }) : 
        res.json({ exists: false }))
      )
    .catch(err => console.log(err));
});

module.exports = router;