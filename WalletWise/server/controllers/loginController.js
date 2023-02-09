const express = require("express");
const router = express.Router();
const { User } = require("../models/signupSchema.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const checkAuth = require("../middleware/checkAuth.js");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  return res.json({
    data: {
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
