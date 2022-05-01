const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { ValidateToken } = require("../middlewares/AuthMiddleWare");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password, userfname, userlname, userRole, userEmail } =
    req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      userfname: userfname,
      userlname: userlname,
      userRole: userRole,
      userEmail: userEmail,
    })
      .then(function (user) {
        res.json({
          Message: "Created user success.",
          user: user,
        });
      })
      .catch(function (err) {
        res.json(err.message);
      });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username and Password combination" });
      } else {
        const accessToken = sign(
          { username: user.username, uuid: user.uuid, userRole: user.userRole },
          "importantsecret"
        );
        res.json({
          token: accessToken,
          username: username,
          id: user.uuid,
          userRole: user.userRole,
        });
        return;
      }
    });
  } else {
    res.json({ error: "User dosen't exist" });
    return;
  }
});

router.get("/auth", ValidateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
