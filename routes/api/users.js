const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");

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
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "A user has already registered with that email"})
      } else {
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
    })
})

// login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne ({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "This user does not exist!" });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) genToken(user, res)
          else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
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