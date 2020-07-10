const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");

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
              .then(user => {
                const payload = { id: user.id, handle: user.handle };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });

              })
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
          if (isMatch) {
            const payload = { id: user.id, handle: user.handle };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });

          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })

})

module.exports = router;