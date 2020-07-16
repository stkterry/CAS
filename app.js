const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");


const app = express();
const db = require("./server/config/keys").mongoURI;
const port = process.env.PORT || 5001;
const users = require("./server/routes/api/users");


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./server/config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);  

app.listen(port, () => console.log(`Server is running on port ${port}`));