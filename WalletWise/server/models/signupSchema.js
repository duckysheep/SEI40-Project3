const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions)
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
