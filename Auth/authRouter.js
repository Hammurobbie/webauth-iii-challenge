const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");

const router = express.Router();

const authMod = require("./authModel");

const authMiddleware = require("../middleware/authMiddleware");

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "3hr"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

router.post("/register", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 13);

  req.body.password = hash;

  authMod
    .add(req.body)
    .then(() => {
      res.status(200).json({ message: "User successfully created" });
    })
    .catch(() => {
      res.status(400).json({ message: "User could not be created" });
    });
});

router.post("/login", (req, res) => {
  authMod
    .findBy(req.body.username)
    .then(usr => {
      if (usr && bcrypt.compareSync(req.body.password, usr[0].password)) {
        req.session.user = req.body.username;
        const token = generateToken(usr);
        res.status(200).json({
          message: `Welcome, ${usr[0].username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid username/password" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "User could not be retireved" });
    });
});

router.get("/users", authMiddleware, (req, res) => {
  authMod
    .find()
    .then(usrs => {
      res.status(200).json(usrs);
    })
    .catch(() => {
      res.status(400).json({ message: "Users could not be retireved" });
    });
});

router.delete("/users/:id", (req, res) => {
  authMod
    .remove(req.params.id)
    .then(usrs => {
      res.status(200).json(usrs);
    })
    .catch(() => {
      res.status(400).json({ message: "User could not be deleted" });
    });
});

router.get("/logout", (req, res) => {
  req.session
    ? req.session.destroy(err => {
        err
          ? res.status(403).json({ message: "Error logging out" })
          : res.status(200).json({ message: "User successfully logged out" });
      })
    : res.status(404).json({ message: "Session does not exist" });
});

module.exports = router;
